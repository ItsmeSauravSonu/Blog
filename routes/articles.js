const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

router.get('/new',(req,res)=>{
    res.render('articles/new',{article: new Article()})
})

router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article: new Article()})
})

router.get('/:slug',async (req,res)=>{
    const article =await Article.findOne({slug:req.params.slug})
    if(article==null) {
        res.redirect('/')
    }
res.render('articles/show', {article: article})
})


router.post('/',async (req,res)=>{
let article = new Article({
title: req.body.title,
description: req.body.description,
markdown: req.body.markdown

})

try{
article = await article.save()
res.redirect(`/articles/${article.slug}`)
}catch(e){
res.render('articles/new',{article:article})
}

})


router.put('/id:',(req,res)=>{

})

router.delete('/:id',async (req,res)=>{
await Article.findByIdAndDelete(req.params.id)
res.redirect('/')
})

function saveArticleAndRedirect(path){
    return (req,res) =>{
        
    }
}


module.exports = router