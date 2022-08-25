export const SignInValidators = {
	email: {
		action: (string) => string?.includes('@'),
		message: 'Email format required',
	},
	password: {
		action: (string) => string?.length > 5,
		message: 'Minimum 6 characters',
	},
};

export const SignUpValidators = (formData) => {
	return {
		email: {
			action: (string) => string?.includes('@'),
			message: 'Email format required',
		},
		name: {
			action: (string) => string?.length > 2,
			message: 'Minimum 3 characters',
		},
		password: {
			action: (string) => string?.length > 5,
			message: 'Minimum 6 characters',
		},
		confirmPassword: {
			action: (string) => string === formData.password,
			message: 'Must match password',
		},
	};
};
