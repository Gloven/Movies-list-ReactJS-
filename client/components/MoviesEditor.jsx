import React from 'react';
import './MoviesEditor.less';

const MoviesEditor = React.createClass({
	getInitialState(){
		return{
			title:'',
			releaseYear:'',
			format:'DVD',
			stars:'',
			titleIsEmpty:true,
			starsIsEmpty:true,
			yearIsEmpty:true,
			yearOk:true
		};
	},

	handleTitleChange(event){
		if(event.target.value.trim().length > 0){
			this.setState({
				title: event.target.value,
				titleIsEmpty: false
			});
		} else {
			this.setState({
				titleIsEmpty: true,
				title:''
			})
		};
	},

	handleReleaseYearChange(event){

			if(event.target.value.trim().length > 0 && event.target.value.trim().length<5){
			this.setState({
				releaseYear: event.target.value,
				yearIsEmpty: false
			});
		} else {
			this.setState({
				yearIsEmpty: true,
				releaseYear:''
			})
		};
	},

	handleFormatChange(event){
		this.setState({format: event.target.value});


	},

	handleStarsChange(event){
		if(event.target.value.trim().length > 0){
			this.setState({
				stars: event.target.value,
				starsIsEmpty: false
			});
		} else {
			this.setState({
				starsIsEmpty: true,
				stars:''
			})
		};
	},

	handleMovieAdd(event){
		const newMovie = {
			title: this.state.title,
			releaseYear:this.state.releaseYear,
			format:this.state.format,
			stars:this.state.stars
		};

		this.props.onMovieAdd(newMovie);
		this.setState({title:'',
			releaseYear:'',
			format:'',
			stars:'',
			titleIsEmpty:true,
			starsIsEmpty:true,
			yearIsEmpty:true,
			yearOk:true
		});

	},
	handleMovieSort(){
		this.props.onMovieSort();
		console.log('sorted')
	},

	onBlur: function (event) {
    if (!(+event.target.value.trim()>1899 && +event.target.value.trim()<2017)) {
    	 this.setState({
    		 yearOk:false
    		});
    	} else {
    		this.setState({
     	yearOk:true
    });
    	}
   
  },

	render(){
		const titleIsEmpty = this.state.titleIsEmpty;
		const starsIsEmpty = this.state.starsIsEmpty;
		const yearIsEmpty = this.state.yearIsEmpty;
		const yearOk = this.state.yearOk;

		return (
			<div className='MoviesEditor'>
				<input
					type='text'
					required
					value={this.state.title}
					placeholder = 'Title...'
					onChange={this.handleTitleChange}
					className="input_"
				/>
				<input
					className="input_"
					required
					type="number"
					min = "1900"
					max = "2017"
					value={this.state.releaseYear}
					placeholder = 'Release Year...'
					onChange={this.handleReleaseYearChange}
					onBlur = {this.onBlur}
					
				/>
				<select id="myselect"
					onChange={this.handleFormatChange}>
					<option value={"DVD"}>DVD</option>
					<option value={"VHS"}>VHS</option>
					<option value={"Blu-Ray"}>Blu-Ray</option>
				</select>
				<input
					className="input_"
					required
					type='text'
					value={this.state.stars}
					placeholder = 'Stars...'
					onChange={this.handleStarsChange}
				/>
				<div>
					<button className = 'MoviesEditor__button'
						onClick={this.handleMovieAdd}
						disabled = {starsIsEmpty||titleIsEmpty||yearIsEmpty||!yearOk}>
						Add movie
					</button>
					<button  className = 'MoviesEditor__button' onClick={this.handleMovieSort}>
						Sort
					</button>
					<form method="post" encType="multipart/form-data" action ='http://localhost:8080/upload' id="upload-frm" >
						<input type="file" name="file" />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>	
			);
	}
});
export default MoviesEditor;
