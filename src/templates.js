import {config} from "./config";
import {cleanTitle, getLicenseUrl, getTitle, getTitleLink} from "./helpers.js";

export function logoTemplate ({url, width = "auto", height = "auto", alt = "Logo"}) {
	return `<p align="center">
  <img src="${url}" alt="${alt}" width="${width}" height="${height}" />
</p>`;
}

/**
 * Creates the template for the title.
 * @param name
 * @returns {string}
 */
export function mainTitleTemplate ({name}) {
	return `<h1 align="center">${name}</h1>`
}

/**
 * Creates a line template.
 * @returns {string}
 */
export function lineTemplate () {
	return `![line](https://github.com/andreasbm/readme/blob/master/assets/line.png)`;
}

/**
 * Creates a template for the title.
 * @param title
 * @param level
 * @returns {string}
 */
export function titleTemplate ({title, level}) {
	const beforeTitleContent = level <= 2 ? `${lineTemplate()}${config.LINE_BREAK}${config.LINE_BREAK}` : "";
	return `${beforeTitleContent}${Array(level).fill("#").join("")} ${getTitle({title, level})}`;
}

/**
 * Creates a template for the badges.
 * @param badges
 * @returns {string}
 */
export function badgesTemplate ({badges}) {
	return `<p align="center">
		${badges.map(badge => `<a href="${badge.url}"><img alt="${badge.text}" src="${badge.img}" height="20"/></a>`).join(config.LINE_BREAK)}
	</p>`;
}

/**
 * Creates a template for the license.
 * @param license
 * @returns {string}
 */
export function licenseTemplate ({license}) {
	return `## License
	
Licensed under [${license}](${getLicenseUrl(license)}).`;
}

/**
 * Creates a template for the demo link.
 * @param url
 * @returns {string}
 */
export function demoTemplate ({url}) {
	return `Go here to see a demo <a href="${url}">${url}</a>.`;
}

/**
 * Creates a description template.
 * @param description
 * @param text
 * @param demo
 * @returns {string}
 */
export function descriptionTemplate ({description, text, demo}) {
	return `<p align="center">
  <b>${description}</b></br>
  <sub>${text != null ? text : ""}${demo != null ? ` ${demoTemplate({url: demo})}` : ""}<sub>
</p>

<br />`;
}

/**
 * Creates a bullets template.
 * @param bullets
 */
export function bulletsTemplate ({bullets}) {
	return bullets.map(bullet => `* ${bullet}`).join(config.LINE_BREAK);
}

/**
 * Creates the table of contents.
 * @param sections
 * @returns {string}
 */
export function tocTemplate ({titles}) {
	return `## Table of Contents

${titles.map(title => {
	const tabs = Array(Math.max((title.match(/#/g) || []).length - 1, 0)).fill(config.TAB).join("");
	const cleanedTitle = title.replace(/^[# ]*/gm, "");
	return `${tabs}* [${cleanedTitle}](${getTitleLink(title)})`;
}).join(config.LINE_BREAK)}`

}

/**
 * Creates the authors template.
 * @param authors
 * @returns {string}
 */
export function contributorsTemplate ({contributors}) {
	return `## Contributors
	
${contributors.map(({name, email, url}) => `* <a href="${url}">${name}</a> ${email != null ? `(<a href="mailto:${email}">${email}</a>` : ""})`).join(config.LINE_BREAK)}`;
}

