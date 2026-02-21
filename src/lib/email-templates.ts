
export const generateEmailHtml = (bodyContent: string) => {
    // Convert newlines to <br> for HTML rendering
    const formattedBody = bodyContent.replace(/\n/g, '<br>');

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure Planet Email</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #062d16;
      padding: 15px 20px;
      text-align: center;
      position: relative;
    }
    .header-logo-text {
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0;
    }
    .accent-bar {
      height: 4px;
      background-color: #C2F32C;
      width: 100%;
      display: block;
    }
    .content {
      padding: 40px 30px;
      color: #333333;
      line-height: 1.6;
      font-size: 16px;
    }
    .content p {
      margin-bottom: 15px;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-top: 1px solid #eeeeee;
    }
    .footer a {
      color: #062d16;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100%;
        margin: 0;
        border-radius: 0;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <!-- Trying to use the logo if available, otherwise stylized text -->
      <!-- Since we don't have a guaranteed public URL for the logo yet, we use a nice text representation -->
      <div class="header-logo-text">Pure Planet</div>
    </div>
    <div class="accent-bar"></div>
    
    <div class="content">
      ${formattedBody}
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Pure Planet. All rights reserved.</p>
      <p>0450 010 419 | <a href="mailto:support@pureplanet.net.au">support@pureplanet.net.au</a></p>
    </div>
  </div>
</body>
</html>
  `;
};
