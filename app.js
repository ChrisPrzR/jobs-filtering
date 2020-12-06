let allTags
let tagName

getJobs = async () => {
    try{
        response = await fetch("./data.json");
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error getting data', error)
        }   
    } 
    
renderJobs = async () => {
    const jobs = await getJobs();
    const view = `
        ${jobs.map(companyName => `
            <div class="hidden">
                <div class="company-details">
                    <h2>${companyName.company}</h2>
                    <object type="image/svg+xml" data="${companyName.logo}"></object>
                    <h3>${companyName.position}</h3>
                    <p class="details">${companyName.postedAt} - ${companyName.contract} - ${companyName.location}</p>
                </div>
                <div class="tags">
                    <p>${companyName.role}</p>
                    ${companyName.languages.map(lang => `
                        <p>${lang}</p>
                    `).join('')}
                    <p>${companyName.level}</p>
                    ${companyName.tools.map(tool => `
                        <p>${tool}</p>
                    `).join('')}
                    
                </div>
            </div>
        `).join('')}
    `
    return view
}


const main = async () => {
    const companies = document.querySelector('.cards')
    companies.innerHTML = await renderJobs()
}

selector = async (e) => {
    await main()
    tagName = Array.from(document.querySelectorAll('.tags')).flatMap(e => e.children) 
    const childTags = tagName.map( el => Array.from(el))

    allTags = childTags.map(el => el.map(ele => ele.innerHTML))
    const newTags = [...allTags].flat()
    const uniqueTags = [...new Set(newTags)]

    const renderBtn = `
        ${uniqueTags.map(tag => `
            <button class="${tag} button is-primary is-small is-light is-outlined">${tag}</button>
        `).join('')}
        <button class="remove button is-danger is-outlined is-small">Clear</button>
    `
    return renderBtn
    
}

const filterBtn = async () => {
    const filters = document.querySelector('.filters')
    filters.innerHTML = await selector()

    const buttonSelect = document.getElementsByTagName("button")
    
    const changeClass = () => {
        for (let item of buttonSelect){
            item.addEventListener("click", () => {
                for(let first of tagName){
                    for(let name of first){
                        if(item.innerHTML === name.innerHTML){
                            name.parentElement.parentElement.classList.add("show")
                            name.parentElement.parentElement.classList.add("card")
                            name.parentElement.parentElement.classList.remove("hidden")
                        }
                        if(item.innerHTML === "Clear"){
                            name.parentElement.parentElement.classList.remove("show")
                            name.parentElement.parentElement.classList.remove("card")
                            name.parentElement.parentElement.classList.add("hidden")
                        }
                    }
                }
            })
        }
    }
    changeClass()
}






filterBtn()





