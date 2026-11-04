/**
 * Public read-only catalogue index for the VENTOZZA website.
 * This scans the shared Drive folder each time the site requests the index,
 * so additions/removals appear automatically without editing the site data.
 */
const CATALOGUE_ROOT_FOLDER_ID = '18s-hMbih7OIsoS7cFqk-07EOjJVCzLFc'

function doGet(event) {
  const callback = String(event?.parameter?.callback || '')
  if (!/^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService.createTextOutput('A valid callback parameter is required.')
      .setMimeType(ContentService.MimeType.TEXT)
  }

  const catalogues = []
  const root = DriveApp.getFolderById(CATALOGUE_ROOT_FOLDER_ID)
  collectCatalogues(root, '', catalogues)
  catalogues.sort((a, b) => a.group.localeCompare(b.group) || a.title.localeCompare(b.title))

  const json = JSON.stringify({ catalogues })
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return ContentService.createTextOutput(`${callback}(${json});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
}

function collectCatalogues(folder, parentFormat, output) {
  const format = parentFormat || folder.getName()
  const files = folder.getFilesByType(MimeType.PDF)
  while (files.hasNext()) {
    const file = files.next()
    const id = file.getId()
    const name = file.getName()
    const fileName = name.toLowerCase().endsWith('.pdf') ? name : `${name}.pdf`
    const groupInfo = formatInfo(format, name)
    const title = name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
      .replace(/\b\w/g, (character) => character.toUpperCase())
    const previewUrl = `https://drive.google.com/file/d/${id}/preview`

    output.push({
      id,
      group: groupInfo.group,
      size: groupInfo.size,
      title,
      fileName,
      cover: `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
      previewPage: 1,
      pdfUrl: previewUrl,
      previewUrl,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
    })
  }

  const folders = folder.getFolders()
  while (folders.hasNext()) collectCatalogues(folders.next(), format, output)
}

function formatInfo(folderName, fileName) {
  const source = `${folderName} ${fileName}`.toLowerCase().replace(/\s+/g, '')
  if (/600x1200.*600x600|full.?body/.test(source)) return { group: '600-full-body', size: '600 × 1200 & 600 × 600 mm · Full Body' }
  if (/1200x2400/.test(source)) return { group: '1200x2400', size: '1200 × 2400 mm' }
  if (/1200x1800/.test(source)) return { group: '1200x1800', size: '1200 × 1800 mm' }
  if (/800x1600/.test(source)) return { group: '800x1600', size: '800 × 1600 mm' }
  if (/800x800/.test(source)) return { group: '800x800', size: '800 × 800 mm' }
  if (/600x1200/.test(source)) return { group: '600x1200', size: '600 × 1200 mm' }
  if (/600x600/.test(source)) return { group: '600x600', size: '600 × 600 mm' }
  if (/300x600/.test(source)) return { group: '300x600', size: '300 × 600 mm' }
  if (/300x450/.test(source)) return { group: '300x450', size: '300 × 450 mm' }
  if (/200x1200/.test(source)) return { group: '200x1200', size: '200 × 1200 mm' }
  if (/step|riser/.test(source)) return { group: 'step-riser', size: 'Step & riser formats' }
  return { group: 'brochure', size: 'VENTOZZA brochure' }
}
