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
     <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no} </button>
       `
      levelContainer.appendChild(btnDiv)
    });
}


const loadLevelWords = (id) => {
const url = `https://openapi.programming-hero.com/api/level/${id}`
 fetch(url)
 .then(res => res.json())
 .then(data => displayLevelWords(data.data))
}


const displayLevelWords =(words) => {
    // console.log(words);

 const wordConatiner = document.getElementById("word-container")
 wordConatiner.innerHTML = ""
 words.forEach(word => {
    const card = document.createElement('div')
    card.innerHTML = `
<div class="bg-white text-center shadow-xs rounded-xl py-10 px-3 space-y-4">
        <h3 class="text-3xl font-bold">${word.word}</h3>
        <p>Meaning /Pronounciation</p>
        <h4 class="text-xl text-gray-600 font-semibold">"${word.meaning}/ ${word.pronunciation}"</h4>
  <div class="flex justify-between items-center mt-10">
   <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
   <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
  </div>  
</div>
    `
    wordConatiner.appendChild(card)
 })


if(words.length == 0){
wordConatiner.innerHTML =`
<div class="text-center col-span-full space-y-3 py-5 font-bangla">
    <p class="text-sm text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <p class="text-3xl font-semibold"> পরের Lesson এ যান</p>
</div>
    `
}


}


