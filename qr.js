function generateQRCode() {
  const input = document.getElementById('verifyInput').value;
  if (!input) return alert('Please enter a valid ID');

  QRCode.toCanvas(document.getElementById('qrCanvas'), input, function (error) {
    if (error) console.error(error);
    else console.log('QR Code generated!');
  });
}
