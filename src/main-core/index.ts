import Generator from 'yeoman-generator';

class MainCore extends Generator {
	initializing() {
		this.composeWith(require.resolve('../typescript'), {});
		this.composeWith(require.resolve('../sass'), {});

		this.composeWith(require.resolve('../editorconfig'), {});
		this.composeWith(require.resolve('../lint-staged'), {});
		this.composeWith(require.resolve('../prettier'), {});
		this.composeWith(require.resolve('../eslint'), {});
		this.composeWith(require.resolve('../eslint-prettier'), {});
		this.composeWith(require.resolve('../eslint-typescript'), {});
		this.composeWith(require.resolve('../stylelint'), {});
		this.composeWith(require.resolve('../stylelint-prettier'), {});
		this.composeWith(require.resolve('../stylelint-sass'), {});

		this.composeWith(require.resolve('../jest'), {});
		this.composeWith(require.resolve('../jest-eslint'), {});
		this.composeWith(require.resolve('../jest-typescript'), {});

		this.composeWith(require.resolve('../faker'), {});
		this.composeWith(require.resolve('../faker-typescript'), {});
	}
}

module.exports = MainCore;
