(function(){
    /*
    LORSQUE on clique sur un onglet
        on retire la class active de l'onglet actif
        j'ajoute la class active à l'onglet cliquer

        on retire la class active sur le contenu actif
        on ajoute la class active au contenu correspondant au clique
    */
    let afficherOnglet=function(a, animations){
        let li=a.parentNode
        let div=a.parentNode.parentNode.parentNode
        let activeTab=div.querySelector('.tab-content.active') //élement active
        let aAfficher = div.querySelector(a.getAttribute('href')) //élément a afficher
        if(animations===undefined)
        {
            animations=true
        }
        if(li.classList.contains('active'))
        {
            return false
        }
        div.querySelector('.tabs .active').classList.remove('active')
        li.classList.add('active')
        if(animations){
            activeTab.classList.add('fade')
            activeTab.classList.remove('in')
            let transitionend=function(){
                this.classList.remove('fade')
                this.classList.remove('active')
                aAfficher.classList.add('active')
                aAfficher.classList.add('fade')
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
                activeTab.removeEventListener('transitionend',transitionend)
                activeTab.removeEventListener('webkitTransitionEnd',transitionend)
                activeTab.removeEventListener('oTransitionEnd',transitionend)
            }
            activeTab.addEventListener('transitionend',transitionend)
            activeTab.addEventListener('webkitTransitionEnd',transitionend)
            activeTab.addEventListener('oTransitionEnd',transitionend)
        } else {
            aAfficher.classList.add('active')
            activeTab.classList.remove('active')
        }
    } 
    let tabs=document.querySelectorAll('.tabs a')
    for (let i=0;i<tabs.length;i++)
    {
            tabs[i].addEventListener('click', function(e){
                afficherOnglet(this)
            
        })
    }

    let hashchange=function(e){
        let hash=window.location.hash
        let a=document.querySelector('a[href="'+ hash +'"]')
        if(a!==null && !a.parentNode.classList.contains('active'))
        {
            afficherOnglet(a, e!==undefined)
        }
    }
    window.addEventListener('hashchange',hashchange)
    hashchange()
})()