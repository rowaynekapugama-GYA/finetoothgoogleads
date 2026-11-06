THE FINE TOOTH COMPANY: GOOGLE ADS LANDING PAGES
Prepared by Generate Your Audience, November 2026

WHAT'S IN HERE
  new-patients/index.html        New Patient page (Dentist Near Me + Croydon & Suburbs ad groups)
  emergency-dentist/index.html   Emergency page (Emergency Dentist ad group)
  assets/css/styles.css          Shared styles
  assets/js/main.js              Open-now status, today's hours, reviews badge, click tracking
  assets/img/                    Logo, tooth mark, favicon
  index.html                     Simple preview page linking to both pages (handy for Vercel/Netlify
                                 previews; not needed on the live site)

GOING LIVE (finetooth.com.au is WordPress)
  1. In SiteGround File Manager (or FTP), upload new-patients/, emergency-dentist/ and assets/
     into public_html so the pages live at:
       https://finetooth.com.au/new-patients/
       https://finetooth.com.au/emergency-dentist/
     A real folder takes priority over WordPress, so the existing /treatments/emergency-dentist/
     page is not affected. Check there is no existing /assets/ folder in public_html first.
  2. Set the Google Ads final URLs to the two pages above (the build brief has the ad group split).
  3. Both pages are set to noindex so they don't compete with the main site in Google search.
     Ads still serve to them normally.

SETTINGS TO EDIT (top of each index.html, inside window.TFTC)
  rating       "4.9" (Google Business Profile, Nov 2026). Blank shows "Read our Google reviews".
  reviewCount  "212" (Google Business Profile, Nov 2026). Update as it grows. The reviews band
               further down the page has the same numbers written in, so change both.
  hours        24-hour times, Melbourne time. Drives "Open now until..." and the "Today" row.
               The contact table is also written into the HTML, so change both if hours change.

TRACKING (GTM container GTM-TN893VDN is already on both pages)
  Every call and booking button pushes a dataLayer event:
    tftc_call_click   (tel: links)
    tftc_book_click   (Core Practice booking links, open in a new tab)
  Each event carries lp_page (new-patient / emergency) and click_location (hero, sticky, etc.).
  In GTM: if the existing Book Now and phone click triggers are based on the link URL
  (contains corepractice.is / starts with tel:), they will fire here already. If not, add Custom
  Event triggers for the two events above and attach the existing Google Ads conversion tags
  (Book Now and Calls From Websites). Use one or the other, not both, so clicks count once.
  Test in GTM Preview before the ads go live.

IMAGES
  Clinic photos (reception, treatment rooms, team, kids, front desk) are bundled in assets/img.
  The hero and final banner use upscaled copies (bg-*.webp) under a navy overlay. The originals
  supplied were 680px wide, so higher-resolution versions would look sharper on large screens:
  drop them in with the same file names.
  The three individual team headshots load from the live site (finetooth.com.au/wp-content/uploads).
  If one can't load, the card shows initials instead, so nothing breaks.

CONFIRM WITH THE PRACTICE BEFORE LAUNCH
  - Opening hours. The website lists Friday until 5:30pm but the Google Business Profile shows
    Friday closing at 5pm. The website also lists Monday from 8:00am (footer says 8:30am) and
    Healthdirect lists Tuesday until 7:30pm. Pages use the website hours.
  - $299 offer terms. The website shows * and ** footnotes with no text. The pages say "X-rays and
    polish are provided where clinically appropriate. Ask our team for the full offer terms."
    Replace with the practice's own wording if different. The "$575 value" claim is left out.
  - Same-day emergency appointments. Pages say "we'll find you the soonest appointment", not
    "same day". Upgrade the wording only if the practice confirms.
  - Team: Dr Shilani Piyasena, Dr Tran Nguyen and Jayali Perera (from the Meet the Team page).
    Dr Amy Tran is listed elsewhere on the site without a bio, so she's not shown.
  - The (03) 5281 1899 number on the main website looks wrong and isn't used here.

COMPLIANCE NOTES
  No testimonials or review quotes, no "best" claims, no before and after photos, price shown as
  $299 only, and the AHPRA surgical risk statement is in the footer. Reviews are shown as the
  Google star rating and count with a link to Google, never as quotes.
