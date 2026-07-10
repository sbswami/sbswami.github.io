#!/usr/bin/env python3
"""Generate an ATS-friendly resume.docx using only the Python standard library.

Produces a clean, single-column Word document that mirrors resume.html.
Run: python3 build_resume_docx.py
"""
import zipfile
from xml.sax.saxutils import escape

OUT = "resume.docx"

NAME = "Shyam Bihari Swami"
TITLE = "Software Engineer | Full-Stack & Mobile Developer | Founder"
CONTACT = "sbswami18@gmail.com | +91 8239199344 | linkedin.com/in/sbswami18 | sbswami.github.io | India (Remote)"


def run(text, bold=False, sz=20):
    b = '<w:b/>' if bold else ''
    return (
        f'<w:r><w:rPr>{b}<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/></w:rPr>'
        f'<w:t xml:space="preserve">{escape(text)}</w:t></w:r>'
    )


def para(runs_xml, style=None, space_after=60, space_before=0, jc=None):
    ppr = '<w:pPr>'
    if style:
        ppr += f'<w:pStyle w:val="{style}"/>'
    if jc:
        ppr += f'<w:jc w:val="{jc}"/>'
    ppr += f'<w:spacing w:before="{space_before}" w:after="{space_after}"/>'
    ppr += '</w:pPr>'
    return f'<w:p>{ppr}{runs_xml}</w:p>'


def heading(text):
    # Section heading: bold, uppercase, accent color, bottom border
    ppr = (
        '<w:pPr>'
        '<w:spacing w:before="140" w:after="50"/>'
        '<w:pBdr><w:bottom w:val="single" w:sz="8" w:space="2" w:color="1F4E79"/></w:pBdr>'
        '</w:pPr>'
    )
    r = (
        f'<w:r><w:rPr><w:b/><w:color w:val="1F4E79"/><w:sz w:val="22"/>'
        f'<w:szCs w:val="22"/></w:rPr><w:t xml:space="preserve">{escape(text.upper())}</w:t></w:r>'
    )
    return f'<w:p>{ppr}{r}</w:p>'


def bullet(text_runs):
    ppr = (
        '<w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>'
        '<w:spacing w:after="30"/></w:pPr>'
    )
    return f'<w:p>{ppr}{text_runs}</w:p>'


def rich(segments):
    """segments: list of (text, bold)"""
    return ''.join(run(t, bold=b) for t, b in segments)


def job(title, company, meta, bullets):
    parts = []
    # Title + meta on one line: title bold, meta right via tab
    tline = (
        '<w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="9360"/></w:tabs>'
        '<w:spacing w:before="90" w:after="0"/></w:pPr>'
        f'<w:r><w:rPr><w:b/><w:sz w:val="21"/></w:rPr>'
        f'<w:t xml:space="preserve">{escape(title)}</w:t></w:r>'
        '<w:r><w:tab/></w:r>'
        f'<w:r><w:rPr><w:color w:val="4A4A4A"/><w:sz w:val="18"/></w:rPr>'
        f'<w:t xml:space="preserve">{escape(meta)}</w:t></w:r></w:p>'
    )
    parts.append(tline)
    parts.append(para(
        f'<w:r><w:rPr><w:b/><w:color w:val="4A4A4A"/><w:sz w:val="20"/></w:rPr>'
        f'<w:t xml:space="preserve">{escape(company)}</w:t></w:r>',
        space_after=40))
    for b in bullets:
        parts.append(bullet(rich(b)))
    return ''.join(parts)


body = []

# Header
body.append(para(run(NAME, bold=True, sz=40), space_after=20, jc="center"))
body.append(para(
    f'<w:r><w:rPr><w:b/><w:color w:val="1F4E79"/><w:sz w:val="22"/></w:rPr>'
    f'<w:t xml:space="preserve">{escape(TITLE)}</w:t></w:r>', space_after=20, jc="center"))
body.append(para(
    f'<w:r><w:rPr><w:color w:val="4A4A4A"/><w:sz w:val="18"/></w:rPr>'
    f'<w:t xml:space="preserve">{escape(CONTACT)}</w:t></w:r>', space_after=60, jc="center"))

# Summary
body.append(heading("Professional Summary"))
body.append(para(rich([
    ("Software Engineer with 5+ years of experience who founded and solo-built ", False),
    ("myStatus", True),
    (", a bootstrapped Flutter app that scaled to ", False),
    ("600K+ users", True),
    (" and ", False),
    ("INR 1.5 Cr+ (~$180K+) in revenue", True),
    (" within 15 months. Proven across startups and scale-ups building scalable, cross-platform "
     "mobile and web applications with Flutter, React, React Native, Node.js, and MongoDB - owning "
     "full product lifecycles from architecture to deployment on GCP and AWS. Skilled in team "
     "leadership, reusable component libraries, and shipping high-impact features that reduce "
     "engineering effort and drive revenue.", False),
])))

# Core Skills
body.append(heading("Core Skills"))
skills = [
    ("Languages", "Dart, JavaScript, TypeScript, Java, Kotlin, Python, HTML, CSS, SQL"),
    ("Mobile", "Flutter, React Native, Android (Kotlin/Java), Cross-Platform Development"),
    ("Frontend", "ReactJS, Angular, Redux, Storybook, Component Library Design, Responsive UI"),
    ("Backend", "Node.js, ExpressJS, REST APIs, Django, Electron"),
    ("Databases", "MongoDB, SQLite, Local Storage / Offline DB"),
    ("Cloud & DevOps", "Google Cloud Platform (GCP), AWS, Cloud CDN, Cloud Storage, CI/CD, GitHub Actions, Git"),
    ("Practices", "Agile / Scrum, System Design, Payment Gateway Integration, Team Leadership, Product Management"),
]
for label, val in skills:
    body.append(para(rich([(f"{label}: ", True), (val, False)]), space_after=40))

# Experience
body.append(heading("Professional Experience"))
body.append(job(
    "Solo Founder & Full-Stack Developer", "myStatus (Self-Employed)", "Jan 2025 – Present · Remote",
    [
        [("Founded and solo-built myStatus, a Flutter-based status and greeting creation app, generating ", False),
         ("INR 1.5 Cr+ (~$180K+) in revenue", True), (" within 15 months, fully bootstrapped.", False)],
        [("Architected and shipped the complete tech stack independently: Flutter (frontend), Node.js and ExpressJS with MongoDB (backend), deployed on Google Cloud Platform.", False)],
        [("Integrated Cloud CDN and GCP Storage to deliver high-speed media loading and a seamless experience at scale.", False)],
        [("Designed custom algorithms for media rendering and personalized templates, optimizing performance for low-end devices.", False)],
        [("Built admin tools and analytics dashboards for content management, user behavior tracking, and in-app engagement monitoring.", False)],
        [("Integrated payment infrastructure for in-app purchases and premium content, driving monetization.", False)],
        [("Scaled to ", False), ("600K+ user reach", True), (" through organic growth and high-performing marketing campaigns, while owning product, marketing, support, and business strategy.", False)],
    ]))
body.append(job(
    "Senior Software Engineer", "FloBiz (myBillBook)", "Oct 2021 – Jan 2025 · Bengaluru, India",
    [
        [("Built mySandesh, a Flutter app for creating festival greetings, implementing frame-merging with images and videos and reusable resizable custom widgets.", False)],
        [("Led a team of 3 to develop Money Tree by myBillBook, a loan disbursal app in Flutter; created a reusable startup package (translations, theming, routing, local DB, network interceptors) and integrated it with myBillBook in partnership with Liquiloans.", False)],
        [("Headed development of a component library for web and desktop with a team of 3, delivering typography, buttons, tables, cards, and a Storybook; achieved full adoption by 12 developers within 6 months.", False)],
        [("Revolutionized the payment system with a centralized pricing module supporting price lists, payment gateways, flash sales, discounts, and dynamic UI via on-the-air updates, reducing pricing-related developer effort by 4x.", False)],
        [("Created a unified invoice module usable across Android, iOS, Web, and Desktop with on-the-air updates and link-based sharing, reducing invoice bugs from hundreds to 1-2 per month and cutting developer effort 5x.", False)],
        [("Started with Android development in Kotlin on myBillBook, handling daily tasks and bug fixes while building deep product knowledge.", False)],
    ]))
body.append(job(
    "Mobile Engineer", "smallcase", "Jul 2020 – Oct 2021 · Bengaluru, India",
    [
        [("Refactored the entire smallcase app from class-based to functional components in React Native, improving maintainability.", False)],
        [("Developed a custom React Native SDK for Freshchat due to the lack of an official version.", False)],
        [("Integrated a payment gateway for the smallcase Manager payment system, a key revenue source.", False)],
    ]))
body.append(job(
    "Full-Stack Developer", "Actyv", "Dec 2019 – Jun 2020 · Bengaluru, India",
    [
        [("Built the Bill Discounting application using MongoDB, ExpressJS, and React Native.", False)],
        [("Contributed to multiple products including Jandan and Bill Discounting.", False)],
        [("Deepened expertise in TypeScript and JavaScript fundamentals.", False)],
    ]))
body.append(job(
    "Software Developer", "Script IT Solutions", "Jul 2019 – Dec 2019 · India",
    [
        [("Worked across ReactJS (TypeScript), Django (Python 3), and Electron simultaneously.", False)],
        [("Contributed to shared e-commerce and inventory management projects.", False)],
        [("Independently developed an election ballot application using ReactJS and Electron.", False)],
    ]))

# Education
body.append(heading("Education"))
body.append(job(
    "B.Tech, Computer Science and Engineering", "Rajasthan Technical University, Kota", "Aug 2015 – May 2019",
    [
        [("Built a Canteen Management System using Java 8 and SQLite for offline use.", False)],
        [("Developed Buy Sell Inventory and Farm Management System Android apps using Java and Android Studio.", False)],
    ]))

# Key Achievements
body.append(heading("Key Achievements"))
for seg in [
    [("Generated ", False), ("INR 1.5 Cr+ (~$180K+) revenue", True), (", bootstrapped and built solo with myStatus in 15 months.", False)],
    [("Reached ", False), ("600K+ users", True), (" across products.", False)],
    [("Delivered a unified invoice module that reduced developer effort 5x at FloBiz.", False)],
    [("Led teams of 3 developers across multiple product launches.", False)],
    [("Drove full-stack ownership across Flutter, ReactJS, ExpressJS, MongoDB, and GCP.", False)],
]:
    body.append(bullet(rich(seg)))

document_xml = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    '<w:body>'
    + ''.join(body) +
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>'
    '<w:pgMar w:top="720" w:right="1080" w:bottom="720" w:left="1080" '
    'w:header="360" w:footer="360" w:gutter="0"/></w:sectPr>'
    '</w:body></w:document>'
)

content_types = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    '<Default Extension="xml" ContentType="application/xml"/>'
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
    '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>'
    '</Types>'
)

rels = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
    '</Relationships>'
)

doc_rels = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>'
    '</Relationships>'
)

styles = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    '<w:docDefaults><w:rPrDefault><w:rPr>'
    '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>'
    '<w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:rPrDefault></w:docDefaults>'
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/>'
    '<w:pPr><w:spacing w:after="60" w:line="240" w:lineRule="auto"/></w:pPr></w:style>'
    '</w:styles>'
)

numbering = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    '<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>'
    '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/>'
    '<w:lvlText w:val="&#8226;"/><w:lvlJc w:val="left"/>'
    '<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr>'
    '<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr></w:lvl>'
    '</w:abstractNum>'
    '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>'
    '</w:numbering>'
)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml", content_types)
    z.writestr("_rels/.rels", rels)
    z.writestr("word/document.xml", document_xml)
    z.writestr("word/_rels/document.xml.rels", doc_rels)
    z.writestr("word/styles.xml", styles)
    z.writestr("word/numbering.xml", numbering)

print(f"Wrote {OUT}")
