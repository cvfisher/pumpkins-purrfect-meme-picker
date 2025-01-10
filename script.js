"use strict";

import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
memeModalCloseBtn.addEventListener("click", closeModal);
getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
	const selectedOption = e.target.querySelector("option:checked");
	const options = e.target.querySelectorAll("option");
	options.forEach((option) => {
		option.classList.remove("highlight");
	});
	if (selectedOption) {
		selectedOption.classList.add("highlight");
	}
}

function closeModal() {
	memeModal.style.display = "none";
}

function renderCat() {
	const catObject = getSingleCatObject();
	memeModalInner.innerHTML = `<img 
		class="cat-img" 
		src="./images/${catObject.image}"
		alt="${catObject.alt}"
		>`;
	memeModal.style.display = "flex";
}

function getSingleCatObject() {
	const catsArray = getMatchingCatsArray();
	if (catsArray.length === 1) {
		return catsArray[0];
	} else {
		const randomIndex = Math.floor(Math.random() * catsArray.length);
		return catsArray[randomIndex];
	}
}

function getMatchingCatsArray() {
	const selectedEmotion = document.querySelector(
		'select[name="emotion"]'
	).value;
	const isGif = gifsOnlyOption.checked;

	const matchingCatsArray = catsData.filter((cat) => {
		if (isGif) {
			return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
		}
		return cat.emotionTags.includes(selectedEmotion);
	});
	return matchingCatsArray;
}

function getEmotionsArray(cats) {
	const emotionsArray = [];
	for (let cat of catsData) {
		for (let emotion of cat.emotionTags) {
			if (!emotionsArray.includes(emotion)) {
				emotionsArray.push(emotion);
			}
		}
	}
	return emotionsArray;
}

function renderEmotionsRadios(cats) {
	const emotions = getEmotionsArray(cats);
	let selectItems = `<select name="emotion" aria-label="Select emotion">`;
	for (let emotion of emotions) {
		selectItems += `
        <option id="${emotion}" value="${emotion}" aria-label="${emotion}">${emotion}</option>`;
	}
	selectItems += `</select>`;
	emotionRadios.innerHTML = selectItems;
}

renderEmotionsRadios(catsData);
