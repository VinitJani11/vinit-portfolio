# Vinitkumar Jani | Three career focus portfolio (v2)

A responsive portfolio for UK graduate opportunities in **Business Analysis, Data Analytics and Software Engineering**. No cybersecurity-focused positioning. Built with HTML, CSS and JavaScript, with no dependencies.

## What is included

- Approved circular portrait with transparent exterior, saved as `assets/vinit-approved-portrait.webp`
- Light/dark toggle with remembered preference
- Hero, three career focus cards with working project filtering, six projects, experience, education, skills and contact links
- A **general graduate CV in `resume.html`**, formatted for printing or saving as a PDF
- Keyboard accessible navigation, mobile layout and reduced motion support

## How to preview

Open `index.html` in a browser, or for a local server:

```bash
python3 -m http.server 8000
```

Navigate to `http://localhost:8000/`. To export the printable CV, open `resume.html` and select **Print / Save as PDF**.

## Deploy

Upload the **contents** of this directory to the root of the GitHub Pages repository, then enable Pages in repository **Settings > Pages** on the default branch `/ (root)`. Existing site remains untouched until you publish this version.

## Final verification before publishing

1. Confirm your current Marks & Spencer employment and education ranking, plus all quantified results.
2. The `resume.html` is a **general-role adaptation** of your supplied cybersecurity CV. Review it and choose whether to publish it in place of your original PDF.
3. Provide the direct SmartFridge repository link. The project card currently links to your GitHub profile.
4. Supply project screenshots for the actual VigilAI and London Crime Analysis interfaces. The current featured visuals are clearly illustrative CSS graphics, not real screenshots.
5. The approved portrait is AI-edited from your uploaded photo and should be checked by you for faithfulness.

No site or GitHub repository has been automatically changed or published.


## Version 3: project evidence

The `assets/projects` directory contains authentic screenshots from the uploaded project images and report documents. `PROJECT_IMAGE_SOURCES.json` records each image's source. The Evidence section shows these visuals with click-to-open full-resolution WebP images. MediTrack data-table screenshots containing patient details were excluded.

The animated role title cycles Business Analysis, Data Analytics and Software Engineering and automatically stays still for visitors requesting reduced motion.


## Version 4 improvements
- Refined subtle hover, navigation and scroll animations; reduced-motion preferences are respected.
- Skills reorganised into four evidence-led groups with individual skill tags, based on the supplied CV and project materials.
- All existing project images and galleries remain intact.
- Automatic rotation through Business Analysis, Data Analytics, and Software Engineering remains enabled.


## V5 changes
Section order: Hero, About/Education, Career Focus, Skills, Projects, Experience, Contact. Skills use bigger type. All project screenshots open in one modal gallery per project, with arrows, dots, swipe and keyboard controls. No longer opens each image in a new tab.

## V6: Experience details
Each of the four work experiences expands in place to show duties documented in the uploaded CV. Only one item expands at a time, and the first internship is initially open. Native HTML details/summary controls support keyboard and touch use. Employment dates and claimed metrics should be confirmed before public deployment.


## V7: final static audit and fixes
- Added absolute GitHub Pages canonical, Open Graph and Twitter sharing metadata with a 1200×630 social card.
- Improved gallery pagination hit targets, keyboard focus styling and mobile arrow controls.
- Mobile navigation now closes after switching to desktop, with Escape focus restoration.
- Removed internal source-review wording from the printable general CV. **Verify employment dates and academic ranking before launch.**
- Added defensive reduced-motion overrides and more robust focus styling.
- All six galleries retain the original 28 image assets; no user work removed.

### What remains to confirm
This is a static/code audit. The local Chromium browser was denied access to both file:// and localhost by the environment; interactive rendering tests remain pending. Before publishing, validate the site on desktop and mobile, confirm all CV facts, and review social previews once deployed. GitHub Pages URL metadata assumes deployment to https://vinitjani11.github.io/portfolio/ .
