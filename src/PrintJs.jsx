import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const PrintJs = () => {
  const screenshotRef = useRef(null);

  const handleScreenshotAndPrint = () => {
    if (!screenshotRef.current) return;

    html2canvas(screenshotRef.current).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <html>
          <head><title>Screenshot</title></head>
          <body style="margin:0; padding:0;">
            <img src="${dataUrl}" style="width:100%;" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div ref={screenshotRef} className="p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-bold">Printable Area</h2>
        <p>This is the section that will be captured and printed.</p>
      </div>

      <button
        onClick={handleScreenshotAndPrint}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Take Screenshot & Print
      </button>
    </div>
  );
};

export default PrintJs;
