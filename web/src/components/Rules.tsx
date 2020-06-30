import React from "react";
export const Rules = () => {
  return (
    <div
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div className="login-page">
        <main style={{ maxWidth: "1000px", background: "#fff" }}>
          <h2 style={{ textDecoration: "underline", textAlign: "center" }}>
            RULES
          </h2>
          <div className="rules">
            <h4>START OF PLAY</h4>
            <p>
              The game starts once 4 people with different usernames join the
              same room
            </p>
            <h4>TEAM</h4>
            <p>
              Upon the arrival of the players the team of 2 is chosen at random
            </p>
            <h4>COUNT</h4>
            <ol>
              <li>There will a total of 8 games per match</li>
              <li>
                Each game begins with the choice of the Trump Suit for that game
              </li>
              <li>Each game has 13 rounds</li>
            </ol>
            <h4>TRUMP</h4>
            <ol>
              <li>
                At the start of each game, every player gets a chance to bid for
                the trump suit in turns.
              </li>
              <li>
                The highest bidder wins the trump for the game. The suit which
                the highest bidder bids on, becomes the trump suit for the game
                and the bid become the target for the team that the highest
                bidder plays on.{" "}
              </li>
              <li>
                Once the Trump suit is decided the opposite team pick their
                target.{" "}
              </li>
              <li>
                Each player of the opposite team pick a number, and the target
                for the team is set as the sum of the two targets of the
                players.
              </li>
              <li>
                Once both the teams pick their targets, the first round of the
                game begins.
              </li>
            </ol>
            <h4>ROUND</h4>
            <ol>
              <li>
                The first round of the game begins with the highest bidder. He
                can play any card he wants, followed by the others in clockwise
                direction.
              </li>
              <li>The suit for the round is the one he first player plays.</li>
              <li>
                Other players will be able to play only the cards that has suit
                same as the suit of the round.
              </li>
              <li>
                In case there are no cards in the suit of the round, the player
                will be allowed to play any other card.
              </li>
              <li>Winner of the round starts the next round.</li>
            </ol>
            <h4>WINNER</h4>
            <p>
              Once all 4 players play their cards, the winner of the round is
              calculated.
            </p>
            <ol>
              <li>
                All the 4 cards belong to the same suit. The winner is the
                player who played the highest card.
              </li>
              <li>
                One or more cards are played from the Trump suit. The player who
                played the highest card in the trump suit is the winner.
              </li>
              <li>
                One or more cards from other suits than the round suit or Trump
                suit is played. Those cards are considered null. The winner is
                still calculated by the above 2 methods.
              </li>
              <li>The team in which the winner belongs gets 1 point.</li>
              <li>The winner starts the next round</li>
            </ol>
            <h4>GAME POINTS</h4>
            <p>
              At the end of the game i.e. 13 rounds, the points are calculated
              as below,
            </p>
            <div>
              <p style={{ fontWeight: "bold" }}>
                {" "}
                Round Points >= Target for the team:
              </p>
              <p>Points = Round Points * 10 + (Round Points - Target )</p>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>
                {" "}
                Target for the team > Round Points
              </p>
              <p>Points = (Round Points - Target )*10</p>
            </div>
            <h4 style={{ fontWeight: "bold", textAlign: "center" }}>
              The Next Game Begins with Trump Choosing.
              <br /> After the completion of 8 games the match ends. The team
              with the greatest score wins.
            </h4>
          </div>
        </main>
      </div>
    </div>
  );
};
