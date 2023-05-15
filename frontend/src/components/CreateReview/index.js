import { useState, useEffect } from "react"

const CreateReviewForm = () => {
    const emptyStar = <i className="fa-thin fa-star"></i>
    const filledStar = <i className="fa-solid fa-star"></i>
    const [activeRating, setActiveRating] = useState(emptyStar);
    return (
        <div className="ReviewForm">
            <h2>How was your stay?</h2>
            <input
            type="text"
            placeholder="Leave your review here"
            // value={}
            // onChange={}
            />
            <div className="ratings">

            </div>
        </div>
    )
}

export default CreateReviewForm;
