# Automatic Google Drive catalogue sync

The site includes a local catalogue library as a reliable default. If the optional Drive index is configured, the page replaces that list with the current shared Drive contents. The Apps Script in `scripts/google-drive-catalogue-index.gs` recursively scans the folder and returns each PDF with its size group, preview URL, and download URL. After the feed is deployed and configured, adding a PDF to the matching size folder makes it appear on the site the next time the page loads.

## Connect the Drive index

1. Open [script.google.com](https://script.google.com/) while signed into the Google account that owns or can access the catalogue folder.
2. Create a project and paste in `scripts/google-drive-catalogue-index.gs`.
3. Deploy it as a **Web app**, executing as your account and allowing **Anyone** to access the endpoint. The script only returns files inside the shared catalogue folder; the folder is already shared publicly for catalogue access.
4. Copy the deployed web app URL (ending in `/exec`) into the local `.env.local` file:

   ```text
   VITE_CATALOGUE_INDEX_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

5. Restart the Vite dev server or rebuild/redeploy the site. This setting is optional: without it, the site continues to use the bundled catalogue library. After the initial deployment, new Drive uploads appear on the next page load without rebuilding the site.

For predictable sizing, place each PDF in its matching format folder. PDFs with an unrecognized folder or filename appear under **Special brochures**. The Drive share permissions on each PDF must allow the intended site visitors to view it.
