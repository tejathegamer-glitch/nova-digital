NOVA DIGITAL — MANUAL PAYMENT UPDATE
====================================

This version removes Razorpay/Supabase checkout scripts from the public storefront. Customers can see the supplied UPI QR image, a UPI ID placeholder, and an email order form. Bank account number and IFSC are not displayed or configured. You manually verify each payment and send the digital product.

IMPORTANT LIMITATIONS
- This is manual checkout, not automated payment verification.
- The order reference is generated in the browser; it is not stored in a secure database.
- The email button opens the customer's default email app. It does not send an email automatically.
- Never deliver a product based only on a screenshot or a user-entered UTR. Verify the actual credited transaction in your bank/UPI account.
- Anything displayed on a public website can be seen by anyone. Only publish payment details for an account you are authorized to use for the store.
- Do not sell files you do not own or have resale permission for.
- GitHub Pages' terms restrict sites primarily intended to facilitate commercial transactions. Before taking public orders, use a free static host whose current terms permit commercial stores, or confirm an appropriate hosting option. Do not assume GitHub Pages is allowed for a commercial storefront.

FILES TO UPDATE
1. index.html
2. styles.css
3. script.js

SETUP ON YOUR COMPUTER
1. Download and unzip this package.
2. Open script.js in Notepad or VS Code.
3. At the top, edit MANUAL_PAYMENT values:
   upiId: "YOUR-UPI-ID-HERE"
   storeEmail: "YOUR-STORE-EMAIL-HERE"
4. Bank account number and IFSC are intentionally not included in the website. Do not add them to public files.
5. Your supplied cropped QR image is already included at assets/upi-qr.png. Before publishing, scan-test it from another device/app and verify the recipient name. If it does not scan, replace it with a QR exported directly from your UPI app.
6. Check that the product names and prices in script.js are yours to sell and are correct. Current product listings are examples.
7. Test locally by opening index.html in your browser. Add a product to the bag, click “Show payment instructions”, and confirm the amount and details are correct. Test the email button; it should open your default email app.
8. Upload/replace index.html, styles.css and script.js in your hosting repository and commit the changes. Also upload the assets folder containing upi-qr.png.

MANUAL ORDER PROCESS
1. Customer chooses product(s) and clicks “Show payment instructions”.
2. Customer pays the displayed amount using the QR or UPI ID.
3. Customer enters name/email and optional payment reference, then submits. Their email app opens with the order details pre-filled; they must send it.
4. You check your actual bank/UPI account for the matching amount and transaction. Contact customer if any detail is missing.
5. Only after payment is verified, email the purchased file or a private download link to the customer's email.
6. Keep a private order spreadsheet with order reference, products, amount, payment verification status, and delivery status. Do not store sensitive credentials.

PRIVACY & SECURITY
- Do not put passwords, OTPs, UPI PINs, card details, API secrets, or bank login details in these files.
- A public UPI ID/QR and bank account details may be copied by anyone; publish only what you intend customers to see.
- Static frontend code cannot confirm a bank transfer automatically or protect downloadable files. Never put paid files in a public website folder if you need access control.

NO PAYMENT GATEWAY OR MANDATORY PAID SOFTWARE IS REQUIRED FOR THIS MANUAL WORKFLOW. Your email provider, bank, host and any other service may still have their own terms and limits.
