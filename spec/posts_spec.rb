require 'rails_helper'

describe Post  do
	before do
		Post.destroy_all
		User.destroy_all
		load "#{Rails.root}/db/seeds.rb" 
	end
	it "should have an author" do
		post = Post.new content: "This is a new post", title: "This is the content of the new post."
		expect(post).to be_invalid
	end

	it "should have a title shorter than 300 characters " do 
		post = Post.new(author: User.first, title: "Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas. Un riachuelo llamado Pons fluye por su pueblo y los abastece con las normas nece",content: "Una mañana, tras un sueño intranquilo, Gregorio Samsa se despertó convertido en un monstruoso insecto. Estaba echado de espaldas sobre un duro caparazón y, al alzar la cabeza, vio su vientre convexo y oscuro, surcado por curvadas callosidades, sobre el que casi no se aguantaba la colcha, que estaba a punto de escurrirse hasta el suelo. Numerosas patas, penosamente delgadas en comparación con el grosor normal de sus piernas, se agitaban sin concierto. - ¿Qué me ha ocurrido? No estaba soñando. Su habit")
		expect(post).to be_invalid
	end
end