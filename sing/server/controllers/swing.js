
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var swingcontroller = express.Router();
    
        swingcontroller.get('/', (req, res) => {
          const { data, error } = supabase
            .from('swing')
            .select().then(data => {
            res.send(data)
          })
        })

        swingcontroller.post('/', (req, res) => {
          let ded = req.body.ded
          const { data, error } = supabase
            .from('swing')
            .insert({ ded:ded }).then(data => {
            res.send(data)
          })
        })

        swingcontroller.delete('/:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('swing')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        swingcontroller.put('/:id', (req, res) => {
          let id = req.params.id;
          let ded = req.body.ded
          const { data, error } = supabase
            .from('swing')
            .update({ ded:ded })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        

        module.exports = swingcontroller;
        