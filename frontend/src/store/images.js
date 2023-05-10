import { csrfFetch } from "./csrf";

export const LOAD_IMAGES = 'images/LOAD_IMAGES';

export const loadImages = images => ({
    type: LOAD_IMAGES,
    images
})

