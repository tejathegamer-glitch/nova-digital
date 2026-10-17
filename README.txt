NOVA DIGITAL V2 — Premium storefront + secure checkout starter

IMPORTANT
- The premium storefront is static and can stay hosted on GitHub Pages for $0.
- Real checkout is intentionally disabled until you configure a backend.
- Never put Razorpay Key Secret, Supabase service-role key, or private product files in this public GitHub repository.
- Razorpay requires server-side order creation and payment signature verification. Never trust a browser-only “payment successful” message.
- Provider transaction fees can apply. Free-tier hosting is subject to usage limits and provider terms.

FILES
- index.html / styles.css / script.js: premium responsive storefront
- supabase/schema.sql: starter database schema
- supabase/functions/create-order/index.ts: server-side order creation
- supabase/functions/verify-payment/index.ts: signature verification starter
- supabase/functions/get-download/index.ts: secure download authorization starter

PHASE 1 — Publish the premium storefront
1. Back up your current repository/download first.
2. Replace index.html, styles.css and script.js in the root of your existing GitHub repository with these files.
3. Commit changes. GitHub Pages redeploys automatically.
4. The storefront and cart will work, but checkout remains disabled until backend setup.

PHASE 2 — Create a free Supabase project
1. Create a project at https://supabase.com/ and choose the Free plan.
2. Copy the Project URL and anon/public key from Project Settings → API.
3. In script.js, fill CONFIG.SUPABASE_URL and CONFIG.SUPABASE_ANON_KEY.
4. Set CONFIG.RAZORPAY_KEY_ID to the Razorpay Key ID (public identifier only). Never add the Key Secret here.
5. Supabase Free currently advertises a free allowance including 500 MB database, 1 GB file storage, and 500,000 Edge Function invocations; free projects can pause after inactivity. Check current limits before launch.

PHASE 3 — Database and private files
1. In Supabase SQL Editor, run schema.sql.
2. Create a PRIVATE Storage bucket named digital-products.
3. Upload product files to this private bucket. Do not upload paid files to GitHub.
4. Replace sample product IDs/prices in the backend with the real catalogue.
5. Deploy Edge Functions using the Supabase CLI and set secrets as described below.
6. Configure Razorpay test keys first. Run test payments, confirm order verification, and test unauthorized download attempts before using live keys.

FUNCTION SECRETS
Set these server-side secrets in Supabase:
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
Never expose the service-role key in the browser or public repository.

SECURITY TODO BEFORE LIVE SALES
This starter is a scaffold, not a turnkey certified store. Before accepting real payments:
- Persist server-created order IDs, expected amount, items and buyer identity in the database.
- Verify Razorpay signatures server-side and confirm payment status with the provider/webhook.
- Make verification idempotent and reject mismatched amounts, unknown orders and duplicate fulfilment.
- Issue short-lived signed URLs only for products on a verified, paid order.
- Add rate limits, input validation, logging, privacy/terms/refund pages, and customer support details.
- Do not use the frontend product price as the authoritative amount. Backend catalogue is authoritative.
- Use Razorpay test mode first and follow the provider's go-live checklist.

This package deliberately does not claim that live checkout or secure downloads are ready until the project-specific credentials, database, functions and storage policies have been configured and tested.


PRODUCT CATALOGUE UPDATE
The storefront now includes demo listings for:
- Ebooks and PDF guides
- Canva/template resources
- Online courses
- Study notes and exam materials
- Code and website templates
- Fonts, presets and creative resources

Before selling, replace demo names, descriptions, prices and artwork with your actual products. Only sell content you created or have permission/licence to resell. Font licences often prohibit redistribution; verify the exact licence first.

FREE-COST PLAN
- Static storefront: GitHub Pages free tier.
- Backend/database: Supabase Free tier (quotas and inactivity pause apply; verify current terms).
- Payment gateway: provider account may have no mandatory subscription, but per-transaction fees apply and merchant eligibility/KYC may be required.
- Secure files: keep paid products in a PRIVATE storage bucket; never put paid files in this public repository.
- This is not yet production-ready checkout. The current download function intentionally refuses access until buyer authentication, paid-order ownership and short-lived signed URL delivery are implemented and tested.
