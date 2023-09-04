
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var minecontroller = express.Router();
    
        minecontroller.get('/', (req, res) => {
          const { data, error } = supabase
            .from('mine')
            .select().then(data => {
            res.send(data)
          })
        })

        minecontroller.post('/', (req, res) => {
          let ded = req.body.ded
          const { data, error } = supabase
            .from('mine')
            .insert({ ded:ded }).then(data => {
            res.send(data)
          })
        })

        minecontroller.delete('/:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('mine')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        minecontroller.put('/:id', (req, res) => {
          let id = req.params.id;
          let ded = req.body.ded
          const { data, error } = supabase
            .from('mine')
            .update({ ded:ded })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        

        module.exports = minecontroller;
        