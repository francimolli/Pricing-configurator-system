# Accommodation Quote Generator

This repository contains JavaScript code snippets that are used to generate a printable quote for accommodation and selected extras. The code dynamically creates an HTML document within a new print window, populating it with details like dates, accommodation type, extra services, and calculated prices.

## Overview

The scripts dynamically write HTML content to a new window, presenting a structured and styled quote. This quote includes the following details:

- Start and end dates of the accommodation.
- The selected type of accommodation and the specific subtype.
- The number of extra people and selected extra services.
- A breakdown of costs, including extras, accommodation price, and the total price.
- The average price per night, accounting for all costs.

The generated document is styled for print and includes a title and a header image.

## Code Snippets

1. **Generating the Quote Header:**

    This code sets up the document with a title and header, including the current date.

    ```javascript
    printWindow.document.write('<head><title>Quote - ' + today + '</title>...</head>');
    ```

2. **Displaying Date and Accommodation Details:**

    These snippets include the booking dates, accommodation type, and extra people count.

    ```javascript
    printWindow.document.write('<body>...<tr><td><h3 style="text-align:left;">Start date:...</h3></td>...</tr>');
    ```

3. **Listing Selected Extras:**

    The selected extras and their confirmation are shown.

    ```javascript
    printWindow.document.write('...<tr><td><h3 style="text-align:left;">Selected extras:...</h3></td>...</tr>');
    ```

4. **Cost Breakdown:**

    Detailed costs for extras, accommodation, and the total price are displayed.

    ```javascript
    printWindow.document.write('...<tr><td><h3 style="text-align:left;"> Price of extras:...</h3></td>...</tr>');
    ```

5. **Finalizing the Quote:**

    The total nights, average price per night, and the comprehensive total are shown last.

    ```javascript
    printWindow.document.write('...<tr><td><h2 style="text-align:left;"> Total Price:...</h2></td>...</tr>...</body>');
    ```

## Usage

The code is designed to be part of a larger application where these snippets are triggered upon a user's request for a quote. The application should handle user inputs, calculate necessary prices, and invoke these scripts to generate and print the quote.

## Customization

You can customize the styling, text, and structure of the generated quote by modifying the HTML and CSS within these scripts to meet your specific requirements or branding guidelines.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page] if you want to contribute.

## License

This project is [MIT licensed](LICENSE).
