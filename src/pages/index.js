import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import ReCAPTCHA from "react-google-recaptcha"

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
  
  	section:last-child {
	  padding-top: 50px;
	}
  
  	h2 {
	  margin-top: 50px;
	}
`

const Messages = styled.div``

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
		&.follow-up {
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
			messages = []

		if (recaptchaValue === '') {
			errors.push('Please complete the ReCAPTCHA check.');
		}

		msgContainer.innerHTML = '';

		if (errors.length) {
			errors.forEach(error => {
				let errorP = document.createElement('p')
				errorP.classList.add('error')
				errorP.appendChild(document.createTextNode(error))
				msgContainer.appendChild(errorP)
			})

			return;
		}

		// TODO add mailchimp functionality
	}

	return (
		<Layout>
			<Container>
				<section>
					<StaticImage src={"../images/mckinney-family.jpeg"} title={"The McKinneys"} alt={"A photo of the McKinney family sitting on a bench."} />
					<h2>Hey There!</h2>
					<p>We are Jacob & Shawnda McKinney and we (and our three kids) are heading to Scotland to join in the work God is doing there. We will be working with other MTW (Mission to the World) missionaries to help support the Free Church of Scotland in their vision to plant 30 churches by 2030.</p>
					<p>If you'd like to keep up with us and what God is doing in our lives and ministry, fill out the form below to sign up for our newsletter. If you'd like to meet with us to learn more about our vision and discuss potentially partnering with us in the work we are doing, check the box at the bottom of the form and we will contact you to set something up.</p>
				</section>
				<section>
					<h2>Join Our Newsletter</h2>
					<Messages id={'messages'} />
					<Form id={"newsletter-form"	} method={'post'} onSubmit={submitForm}>
						<div className={'field first-name'}>
							<label htmlFor={'first-name'}>First Name:</label>
							<input name={'first-name'} type={'text'} value={firstName} onChange={e => setFirstName(e.target.value)} />
						</div>
						<div className={'field last-name'}>
							<label htmlFor={'last-name'}>Last Name:</label>
							<input name={'last-name'} type={'text'} value={lastName} onChange={e => setLastName(e.target.value)} />
						</div>
						<div className={'field email'}>
							<label htmlFor={'email'}>Email:</label>
							<input name={'email'} type={'email'} value={email} onChange={e => setEmail(e.target.value)} required />
						</div>
						<div className={'field follow-up'}>
							<input name={'follow-up'} type={'checkbox'} value={followUp} onChange={e => setFollowUp(e.target.value)} />
							<label htmlFor={'follow-up'}>I would like to learn more about your vision and a potential partnership.</label>
						</div>

						<ReCAPTCHA ref={recaptchaRef} sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY} />

						<button type={'submit'}>Submit</button>
					</Form>
				</section>
			</Container>
		</Layout>
	)
}

export default IndexPage
