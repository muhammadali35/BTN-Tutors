import express from 'express';

import Testimonial from '../models/testimonialModel.js';

export const addTestimonial = async (req, res) => {
    const {name, title, Image, message} = req.body;
    try {
        // Validate input
       
        if (!name || !title || !message) {
            return res.status(400).json({ message: 'Name, title, and message are required' });
        }         
        const newTestimonial = new Testimonial({
            name,
            title,  
            Image,
            message
        });
        await newTestimonial.save();
        res.status(201).json({ message: 'Testimonial added successfully', testimonial: newTestimonial });
    }
    catch (error) {
        console.error('Error adding testimonial:', error);
        res.status(500).json({ message: 'Server error while adding testimonial' });
    }
};
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Server error while fetching testimonials' });
    }
};
export const deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ message: 'Server error while deleting testimonial' });
    }   
};
export const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, title, Image, message } = req.body;   
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { name, title, Image, message },
            { new: true }
        );
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }       
        res.status(200).json({ message: 'Testimonial updated successfully', testimonial: updatedTestimonial });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ message: 'Server error while updating testimonial' });
    }
};
     
