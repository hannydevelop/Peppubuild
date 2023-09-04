
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var samcontroller = express.Router();
    
        samcontroller.get('/', (req, res) => {
          const { data, error } = supabase
            .from('sam')
            .select().then(data => {
            res.send(data)
          })
        })

        samcontroller.post('/', (req, res) => {
          let dang = req.body.dang
          const { data, error } = supabase
            .from('sam')
            .insert({ dang:dang }).then(data => {
            res.send(data)
          })
        })

        samcontroller.delete('/:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('sam')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        samcontroller.put('/:id', (req, res) => {
          let id = req.params.id;
          let dang = req.body.dang
          const { data, error } = supabase
            .from('sam')
            .update({ dang:dang })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        

        module.exports = samcontroller;
        