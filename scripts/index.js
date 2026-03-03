const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}

const arr =["hello","bleo","bello"]

const manageSpinner = (status) => {
   if(status == true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
   }
   else{
    document.getElementById("spinner").classList.add("hidden")
    document.getElementById("word-container").classList.remove("hidden")
   }
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}

loadLessons()

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""
    lessons.forEach(lesson => {
       const btnDiv = document.createElement("div") 
       btnDiv.innerHTML =`
     <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no} </button>
       `
      levelContainer.appendChild(btnDiv)
    });
}

const removeActive = () => {
 const allBtn = document.querySelectorAll(".lesson-btn")
//  console.log(allBtn);
 allBtn.forEach(btns => btns.classList.remove("active"))
}

const loadLevelWords = (id) => {
    manageSpinner(true)
const url = `https://openapi.programming-hero.com/api/level/${id}`
 fetch(url)
 .then(res => res.json())
 .then((data) => { 
   removeActive()
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add("active")
    // console.log(clickBtn);
    displayLevelWords(data.data)})
     
}


const displayLevelWords =(words) => {
    // console.log(words);

 const wordConatiner = document.getElementById("word-container")
 wordConatiner.innerHTML = ""
 words.forEach(word => {
    const card = document.createElement('div')
    card.innerHTML = `
<div class="bg-white text-center shadow-xs rounded-xl py-10 px-3 space-y-4">
        <h3 class="text-3xl font-bold">${word.word?word.word:"শব্দপাওয়া যায়নি" }</h3>
        <p>Meaning /Pronounciation</p>
        <h4 class="text-xl text-gray-600 font-semibold">"${word.meaning?word.meaning:"অর্থ পাওয়া যায়নি"}/ ${word.pronunciation?word.pronunciation:"Pronounciation পাওয়া যায়নি"}"</h4>
  <div class="flex justify-between items-center mt-10">
   <button  onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
   <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
  </div> 
</div>
    `
    wordConatiner.appendChild(card)
    manageSpinner(false)
 })


if(words.length == 0){
wordConatiner.innerHTML =`
<div class="text-center col-span-full space-y-3 py-5 font-bangla">
    <img class="mx-auto" src="./assets/alert-error.png" />
    <p class="text-sm text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <p class="text-3xl font-semibold"> পরের Lesson এ যান</p>
</div>
    `
    manageSpinner(false)
}


}

const loadWordDetail = (id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayWordDetail(data.data))
}

// loadWordDetail()

const displayWordDetail = (details) => {
//   console.log(details.word);
const detailContainer =document.getElementById("details-container")
detailContainer.innerHTML=`
  <div class=" space-y-4">
      <div>
        <p class="text-2xl font-semibold">${details.word}(<i class="fa-solid fa-microphone-lines"></i>${details.pronunciation})</p>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Meaning</p>
        <p class="font-bangla">${details.meaning}</p>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Example</p>
        <p class="text-sm">${details.sentence}</p>
      </div>
      <div class="space-y-2">
        <p class="font-bangla font-semibold" >সমার্থক শব্দ গুলো</p>
        <div class="flex gap-3">
          <div>${createElements(details.synonyms)}</div>
        </div>
      </div>
      </div>


`



document.getElementById("my_modal_5").showModal()
}