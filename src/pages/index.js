import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import ReCAPTCHA from "react-google-recaptcha"
import addToMailchimp from "gatsby-plugin-mailchimp"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Container = styled.div`
  	display: grid;
  	grid-template-columns: repeat(2, 1fr);
  	gap: 50px;
  	background: rgba(255,255,255,0.8);
	max-width: 1200px;
  	margin: 0 auto;
  	padding: 50px 40px;
  
  	section:last-child { padding-top: 50px; }
  	h2 { margin-top: 50px; }
  
  	@media (max-width: 900px) {
	  grid-template-columns: 1fr;
	  
	  section:last-child { 
		padding-top: 0; 
		
		h2 { margin-top: 0; }
	  }
	}
`

const Messages = styled.div`
  		margin-bottom: 15px;
  
		p {
		  margin-bottom: 0;
		  padding: 5px 10px;
		  border-radius: 5px;
		}
  
  		.error {
		  background: rgba(171, 35, 70, 0.8);
		  color: #fff;
		}

	    .success {
		  background: rgba(3, 121, 113, 0.7);
		  color: #fff;
	    }
	`

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 25px;
  	max-width: 600px;
  	margin: 0 auto;
	
	.field {
	  label {
		display: block;
	  }
	  
	  input {
		display: block;
		width: 100%;
	  }
	  
	  &.follow-up {
		display: flex;
		
		label {
		  line-height: 1.35;
		}
		
		input {
		  width: auto;
		  margin-top: 5px;
		  margin-right: 10px;
		}
	  }
	  
		&.email,
		&.follow-up,
		&.recaptcha {
		  grid-column-start: span 2;
		}
	}

  button {
	max-width: 150px;
  }
`

const IndexPage = () => {
	const [firstName, setFirstName] = useState(''),
		[lastName, setLastName] = useState(''),
		[email, setEmail] = useState(''),
		[followUp, setFollowUp] = useState(''),
		recaptchaRef = React.createRef()

	const submitForm = event => {
		event.preventDefault();

		// Validate that the user completed recaptcha
		const recaptchaValue = recaptchaRef.current.getValue(),
			msgContainer = document.getElementById('messages'),
			errors = [],
			messages = [],
			listFields = {
				FNAME: firstName,
				LNAME: lastName,
				FOLLOW_UP: ( followUp ) ? 'Yes' : 'No'
			}

		if (recaptchaValue === '') {
			errors.push('Please complete the ReCAPTCHA check.');
		}

		addToMailchimp(email, listFields)
			.then(data => {
				if ( data.result === 'error' ) {
					errors.push(data.msg)
				} else {
					messages.push(data.msg)
				}

				msgContainer.innerHTML = '';

				if ( messages.length ) {
					messages.forEach( msg => {
						let msgP = document.createElement('p')
						msgP.classList.add('success')
						msgP.appendChild(document.createTextNode(msg))
						msgContainer.appendChild(msgP)
					})
				}

				if (errors.length) {
					errors.forEach(error => {
						let errorP = document.createElement('p')
						errorP.classList.add('error')
						errorP.appendChild(document.createTextNode(error))
						msgContainer.appendChild(errorP)
					})
				}
			})
	}

	return (
		<Layout>
			<Container>
				<section>
					<StaticImage src={"../images/mckinney-family.jpeg"} title={"The McKinneys"} alt={"A photo of the McKinney family sitting on a bench."} />
					<h2>Hey There!</h2>
					<p>We are Jacob & Shawnda McKinney and we (and our three kids) are heading to Scotland to join in the work God is doing there. We will be working with other MTW (Mission to the World) missionaries to help support the Free Church of Scotland in their vision to plant 30 churches by 2030.</p>
					<p>If you'd like to keep up with us and what God is doing in our lives and ministry, fill out the form to sign up for our newsletter. If you'd like to meet with us to learn more about our vision and discuss potentially partnering with us in the work we are doing, check the box at the bottom of the form and we will contact you to set something up.</p>
				</section>
				<section>
					<h2>Join Our Newsletter</h2>
					<Messages id={'messages'} />
					<Form id={"newsletter-form"	} method={'post'} onSubmit={submitForm}>
						<div className={'field first-name'}>
							<label htmlFor={'first-name'}>First Name:</label>
							<input id={'first-name'} name={'first-name'} type={'text'} value={firstName} onChange={e => setFirstName(e.target.value)} />
						</div>
						<div className={'field last-name'}>
							<label htmlFor={'last-name'}>Last Name:</label>
							<input id={'last-name'} name={'last-name'} type={'text'} value={lastName} onChange={e => setLastName(e.target.value)} />
						</div>
						<div className={'field email'}>
							<label htmlFor={'email'}>Email (required):</label>
							<input id={'email'} name={'email'} type={'email'} value={email} onChange={e => setEmail(e.target.value)} required />
						</div>
						<div className={'field follow-up'}>
							<input id={'follow-up'} name={'follow-up'} type={'checkbox'} value={followUp} onClick={e => setFollowUp(e.target.checked)} />
							<label htmlFor={'follow-up'}>I would like to learn more about your vision and a potential partnership.</label>
						</div>

						<ReCAPTCHA className={'field recaptcha'} ref={recaptchaRef} sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY} />

						<button type={'submit'}>Submit</button>
					</Form>
				</section>
			</Container>
		</Layout>
	)
}

export default IndexPage
