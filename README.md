# ADUNAAN — Personal Portfolio

A responsive personal portfolio website built with **HTML, CSS, JavaScript, and Java (Spring Boot)**. The page is served by Spring Boot, while the front end is framework-free and can also be previewed as a static HTML page.

## Requirements
- Java 17 or later
- Maven 3.6+ (or use your IDE's Maven support)

## Run locally
1. Extract the ZIP.
2. Open a terminal in the `adunaan-portfolio` folder.
3. Run:

   ```bash
   mvn spring-boot:run
   ```

4. Open `http://localhost:8080`.

To build a runnable JAR:

```bash
mvn clean package
java -jar target/adunaan-portfolio-1.0.0.jar
```

## Customize your information
Open `src/main/resources/static/index.html` and edit the name, intro, location, email, about copy, learning journey, and footer. Search for `SAMPLE PROJECT` to identify sample project cards. Replace their titles, descriptions, technologies, and preview artwork with real project details. Remove any skills you have not actually explored.

- **Email:** replace `mhdadunaan@gmail.com` in `index.html` and `script.js` if needed.
- **GitHub / LinkedIn:** the current links are clearly marked as configuration placeholders. Replace them with your real profile URLs or remove them.
- **Resume:** add your resume file under `src/main/resources/static/` (for example `resume.pdf`) and add a link to `/resume.pdf` in the navigation or contact area.
- **Skills:** edit the `.skill-tag` elements in the Skills section.
- **Projects:** edit the project cards in the Projects section. Keep the `SAMPLE PROJECT` marker until each example has been replaced with a real project.
- **Colors and spacing:** change the CSS custom properties at the top of `css/style.css`.

## Contact form
The form validates name, email, subject, and message in the browser, then prepares a `mailto:` message addressed to `mhdadunaan@gmail.com`. It does **not** claim to send mail from the website. The Spring Boot `/api/contact` endpoint performs basic server-side validation and returns a `not_configured` status because no email provider is connected.

For real delivery, configure a trusted email service (for example, a server-side SMTP provider or transactional email API), store credentials in environment variables, and implement delivery in `ContactController`. Never place API keys or SMTP passwords in frontend JavaScript or HTML.

## Deployment
Run `mvn clean package` and deploy the JAR to a Java 17+ host that supports Spring Boot, or deploy behind a reverse proxy/container. Set up HTTPS and your chosen email provider before treating the contact form as a production messaging system.

## Notes
- Social URLs and resume are intentionally not fabricated.
- The three project entries are illustrative placeholders, not claims of completed work.
- Motion respects `prefers-reduced-motion`; the site remains usable without animation.
