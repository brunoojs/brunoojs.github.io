export const processCSV = (file, config) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const text = e.target.result
      const lines = text.split('\n')
      const headers = lines[0].split(',').map(header => header.trim())

      const isValidHeaders = config.headers.every(header => 
        headers.includes(header)
      )

      if (!isValidHeaders) {
        throw new Error('Formato de CSV inválido. Headers não correspondem ao esperado.')
      }

      const processedData = lines
        .slice(1) 
        .filter(line => line.trim()) 
        .map((line, index) => {
          const values = line.split(',').map(value => value.trim())
          
          const rowData = {}
          config.headers.forEach(header => {
            rowData[header] = values[headers.indexOf(header)]
          })

          if (config.validations) {
            Object.keys(config.validations).forEach(field => {
              const isValid = config.validations[field](rowData[field])
              if (!isValid) {
                throw new Error(`Valor inválido para o campo ${field}: ${rowData[field]}`)
              }
            })
          }

          return rowData
        })

      const finalData = config.transformData 
        ? processedData.map(config.transformData)
        : processedData

      if (config.onSuccess) {
        config.onSuccess(finalData)
      }

    } catch (error) {
      if (config.onError) {
        config.onError(error.message)
      } else {
        console.error('Erro ao processar CSV:', error.message)
      }
    }
  }

  reader.onerror = () => {
    if (config.onError) {
      config.onError('Erro ao ler o arquivo')
    }
  }

  reader.readAsText(file)
}

export const importCSV = (config) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv'
  
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      processCSV(file, config)
    }
  }
  
  input.click()
}

export const generateCSVTemplate = (headers, exampleRow = '') => {
  const content = headers.join(',') + '\n' + (exampleRow || '')
  const blob = new Blob([content], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'template.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}