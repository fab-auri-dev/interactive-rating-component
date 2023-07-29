if ( window.location.pathname == '/' ) {
    sessionStorage.clear();
}

const showRating = document.getElementById( 'showRating' );
const errorText = document.querySelector( '.error' );
const submitBtn = document.getElementById( 'submitBtn' );
const ratingBtns = Array.from( document.querySelector( '.rating-section' )?.children ?? [] );


function removeSelectedRating( selected ) {
    errorText.style.display = 'none';

    ratingBtns.forEach( btn => {
        if ( btn != selected ) {
            btn.classList.remove( 'active' );
        };
    } );
};


function selectedRating() {
    ratingBtns.forEach( btn => {
        btn.addEventListener( 'click', () => {
            btn.classList.toggle( 'active' );

            removeSelectedRating( btn );

            if ( JSON.parse( sessionStorage.getItem( "selectedRating" ) ) == btn.textContent ) {
                sessionStorage.removeItem( "selectedRating" );
                
                return;
            };
            sessionStorage.setItem( "selectedRating", JSON.stringify( btn.textContent ) );

        } );
    } );
};
selectedRating();


function submitRating( e ) {
    const getsession = sessionStorage.getItem( "selectedRating" );

    if ( ! getsession ) {
        e.preventDefault();
        errorText.style.display = 'block';
    };
};


if ( ratingBtns.length ) {
    submitBtn.addEventListener( 'click', submitRating );
};


function showRatingText() {
    let getsession = sessionStorage.getItem( "selectedRating" );

    if ( showRating ) {
        showRating.textContent = `You selected ${ JSON.parse( getsession ) } out of 5`;

        setTimeout( () => {
            window.location.pathname = '/';
        }, 5000 ); 
    };

};
showRatingText();