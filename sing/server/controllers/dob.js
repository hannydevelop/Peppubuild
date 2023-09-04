
        const express = require('express');

        var supabaseClient = require('@supabase/supabase-js')
        require('dotenv').config()

        // Create a single supabase client for interacting with your database
        const supabase = supabaseClient.createClient(process.env.URL, process.env.ANON_KEY)

        //set variable users as expressRouter
        var dobcontroller = express.Router();
    
        dobcontroller.get('/', (req, res) => {
          const { data, error } = supabase
            .from('dob')
            .select().then(data => {
            res.send(data)
          })
        })

        dobcontroller.post('/', (req, res) => {
          let med = req.body.med
          const { data, error } = supabase
            .from('dob')
            .insert({ med:med }).then(data => {
            res.send(data)
          })
        })

        dobcontroller.delete('/:id', (req, res) => {
          let id = req.params.id;
          const { data, error } = supabase
            .from('dob')
            .delete()
            .eq('id', id).then(data => {
            res.send(data)
          })
        })

        dobcontroller.put('/:id', (req, res) => {
          let id = req.params.id;
          let med = req.body.med
          const { data, error } = supabase
            .from('dob')
            .update({ med:med })
            .eq('id', id).then(data => {
            res.send(data)
          })
        })
        

        module.exports = dobcontroller;
        