export default function PreviewIframe({ jsx, css }) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>${css}</style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        const Component = () => (${jsx});
        ReactDOM.render(<Component />, document.getElementById("root"));
      </script>
      <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </body>
    </html>
  `;

  return (
    <iframe
      title="Preview"
      srcDoc={html}
      style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
    />
  );
}
