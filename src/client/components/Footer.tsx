import * as React from 'react';

export class Footer extends React.PureComponent {
	render() {
		return (
			<div>
				<div className="social">
					<nav className="social-container">
						<a href="https://www.facebook.com/thecedar" target="_blank">
							<img className="social-icon" src="./assets/img/if_facebook_3009513.svg" alt="facebook" />
						</a>
						<a href="http://instagram.com/thecedar" target="_blank">
							<img className="social-icon" src="./assets/img/if_instagram_3009537.svg" alt="insta" />
						</a>
						<a href="http://twitter.com/TheCedar" target="_blank">
							<img className="social-icon" src="./assets/img/if_twitter_3009565.svg" alt="twitter" />
						</a>
					</nav>
				</div>
				<div className="foot">
					<span className="site-address">The Cedar Cultural Center, 416 Cedar Avenue South, Minneapolis, MN, 55454</span>
					<span className="site-address">(612) 338-2674</span>
				</div>
			</div>
		);
	}
}
