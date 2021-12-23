import mongoose from 'mongoose';

export const getMongoConnection = async uri => mongoose.connect(uri); 
