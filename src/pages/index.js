import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = () => {
	return (
		<Layout>
			<form method={'post'}>
				<div className={'field'}>
					<label htmlFor={'first-name'}>First Name:</label>
					<input name={'first-name'} type={'text'} value={''} />
				</div>
				<div className={'field'}>
					<label htmlFor={'last-name'}>Last Name:</label>
					<input name={'last-name'} type={'text'} value={''} />
				</div>
				<div className={'field'}>
					<label htmlFor={'email'}>Email:</label>
					<input name={'email'} type={'email'} value={''} />
				</div>
				<div className={'field'}>
					<input name={'follow-up'} type={'checkbox'} />
					<label htmlFor={'follow-up'}>Would you be interested in learning more about how you can partner with us?</label>
				</div>

				<button type={'submit'}>Submit</button>
			</form>
		</Layout>
	)
}

export default IndexPage
