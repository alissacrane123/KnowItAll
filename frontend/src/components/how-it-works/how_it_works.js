import React from 'react';

class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.handleScrollUp = this.handleScrollUp.bind(this);
  }

  handleScrollUp() {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: -600
    });
  }

  render() {
    return (
      <div className="body-container" onScroll={this.handleScroll}>
        <section className="container-col-1">
          <section className="container-list-col-start">
            <div className="header-how-it-works">
            <section className="container-list-col-center">
                <h1 className="centered-text">How <span className="centered-text-logo">KnowItAll</span> Works</h1>
              <section className="centered-text">
                <h2>
                  Are you and your friends competitive, do you love to call BS? We do too, in order to use this app you 
                  need some friends, imaginary are fine, as long as they play fair. Okay, you are now hanging out with said friends. 
                  Charlie shares that he would love own a flamingo. Whaattt? You kindly point out that, you cannot own a flamingo.    
                  Charlie says no, it's bird law and you definitely can. BOOM it's go time follow the steps below: 
                </h2>
              </section>
            </section>
            </div>
            
            <div className="topButtonSection">
              <div className="background-grey-1-col">
                <section className="container-list-item-lg">
                  <section className="container-list-row-center">
                    <img className="icon-xl" src="https://66.media.tumblr.com/2caa0defd52f13a3e140424249fde6b6/tumblr_psmv01FkER1wyb2l8o1_540.png" alt=""></img>
                    <article className="container-2-3-col">
                      <h2>1 // OPEN KNOWITALL</h2>
                      <h3>Open the KnowItAll app on one of your phones. Challenge Charlie by clicking his name on your friend list.</h3>
                    </article>
                  </section>
                </section>
              </div>

              <section className="container-list-item-lg">
                <section className="container-list-row-center">
                  <button id="top-button" className="top-button" onClick={this.handleScrollUp}><img className="up-arrow" src="https://66.media.tumblr.com/78d42f5f67283ba5cadaf4fffc4bcdde/tumblr_psv3lcL01s1wyb2l8o1_75sq.png"></img></button>
                  <img className="icon-xl" src="https://66.media.tumblr.com/ddef0c68704735c61de4c1775f02cbb7/tumblr_psldefJsES1wyb2l8o1_540.png" alt=""></img>
                  <article className="container-2-3-col">
                    <h2>2 // ASK A QUESTION</h2>
                    <h3>
                      Enter Charlie's idiotic assumption about flamingos in the question field. Add each of your answers in the answer boxes.
                      KnowItAll serves up google results through SERP API & Google Custom Search.
                      To Charlie's humiliation he learns you CANNOT own a flamingo under bird law 34573453.
                      Voice of reason: uhh why wouldn't I just use google? 
                      Beeecause KnowItAll keeps score, dun dun dun!
                    </h3>
                  </article>
                </section>
              </section>

              <div className="background-grey-1-col">
                <section className="container-list-item-lg">
                  <section className="container-list-row-center">
                    <img className="icon-xl" src="https://66.media.tumblr.com/e07d28e9b5660118e207635a77f6dd57/tumblr_psldefJsES1wyb2l8o2_540.png" alt=""></img>
                    <article className="container-2-3-col">
                      <h2>3 // WHO KNEW IT?</h2>
                      <h3>Select a winner, we'll pull up an awesome K.O. gif. Choose some combo of the following
                        1) Wave the gif about and while doing a victory dance. 2) 
                        Feel better knowing your friend is now all the wiser. </h3>
                    </article>
                  </section>
                </section>
              </div>

              <section className="container-list-item-lg">
                <section className="container-list-row-center">
                  <img className="icon-xl" id="wizard-leader" width="200" src="https://66.media.tumblr.com/dfba6578988ca82667b7bc62b9abc1fb/tumblr_psmu1mQyzf1wyb2l8o1_540.png" alt=""></img>
                  <article className="container-2-3-col">
                    <h2>4 // RANKINGS</h2>
                    <h3>On the main page you'll see each of your friends rank.
                      Everyone starts as a spud. What's a spud? It's a baby potato.
                      From there you can prove you KnowItAll and reign as a WIZARD amongst,
                      well, mostly spuds and a few select lizards. The lowest ranking is of 
                      course a piece of poo. Don't be a piece of poo.</h3>
                  </article>
                </section>
              </section>
              
              <div className="background-grey-1-col">
                <section className="container-list-item-lg">
                  <section className="container-list-row-center">          
                    <img className="icon-xl" src="https://66.media.tumblr.com/a0f589abf0ab7a1a9302fb8698fed81a/tumblr_pslds8bgI61wyb2l8o2_540.png" alt=""></img>
                    <article className="container-2-3-col">
                      <h2>5 // YOUR STATS</h2>
                      <h3>Go to your profile to see a fancy chart showing your stats over time.</h3>
                    </article>
                  </section>
                </section>
              </div>

              <section className="container-list-item-lg">
                <section className="container-list-row-center">
                  <img className="icon-xl" src="https://66.media.tumblr.com/89830a945004664fb005572eb73d1fc3/tumblr_pslds8bgI61wyb2l8o1_540.png" alt=""></img>
                  <article className="container-2-3-col">
                    <h2>7 // ADD A FRIEND</h2>
                    <h3> Awww you made a friend. Make your friend open KnowItAll on their phone, and then signup.
                      Once they sign up, have them search your username in the add friend box, on the main page.
                      That's it, it's official, you are now best friends.
                    </h3>
                  </article>
                </section>
              </section>

              <div className="background-grey-1-col">
                <section className="container-list-item-lg">
                  <section className="container-list-row-center">
                    <img className="icon-xl" src="https://66.media.tumblr.com/a9af8315360c8f20228e9f58c96de53d/tumblr_psle18Fpgu1wyb2l8o1_540.png" alt=""></img>
                    <article className="container-2-3-col">
                      <h2>8 // GOOD TIMES</h2>
                      <h3>
                        Laughing is good, laughing is healthy. Go to your page to chuckle at what you didn't know (questions in red), 
                        and of course appreciate all the things you've learned. Or head to the homepage to see a feed of questions happening all over the world. 
                      </h3>
                    </article>
                  </section>
                </section>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default HowItWorks;
