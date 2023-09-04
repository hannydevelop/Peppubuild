
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var sedcontroller = express.Router();
    
        sedcontroller.get('/', (req, res) => {
          const { data, error } = supabase
            .from('sed')
            .select().then(data => {
            res.send(data)
          })
        })

        sedcontroller.post('/', (req, res) => {
          let ded = req.body.ded
          const { data, error } = supabase
            .from('sed')
            .insert({ ded:ded }).then(data => {
            res.send(data)
          })
        })

        sedcontroller.delete('/:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('sed')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        sedcontroller.put('/:id', (req, res) => {
          let id = req.params.id;
          let ded = req.body.ded
          const { data, error } = supabase
            .from('sed')
            .update({ ded:ded })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        

        module.exports = sedcontroller;
        