import html2canvas from 'html2canvas'
import JSPDF from 'jspdf'
import download from 'downloadjs'

/* download dashboard canvas as pdf */
export const downloadToPDF = ({
  dashboardName, width, height
}) => {
  const input = document.getElementById('layout')
  html2canvas(input)
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new JSPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [width, height]
      })
      // const widthPage = pdf.internal.pageSize.getWidth()
      // const heightPage = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, 'PNG', 0, 0, width, height)
      pdf.save(`${dashboardName}.pdf`)
    })
}

/* download dashboard canvas as png */
export const downloadToPNG = dashboardName => {
  const input = document.getElementById('layout')
  html2canvas(input)
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      download(imgData, `${dashboardName}.png`, 'image/png')
    })
}