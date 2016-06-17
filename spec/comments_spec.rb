require 'rails_helper'

describe Comment  do
	before do
		Post.destroy_all
		User.destroy_all
		load "#{Rails.root}/db/seeds.rb" 
	end
	it "should have an author or a nickname for the anonymous author" do
		post = Post.first
		comment = post.comments.build(content: "This is a comment")
		expect(comment).to be_invalid

		comment.anonymous = "Valentina"
		expect(comment).to be_valid

		comment2 = post.comments.build(content: "This is a second comment", author: User.first)
		expect(comment).to be_valid		
	end

	it "should not be longer than 500 characters" do 
		post = Post.first
		comment = post.comments.build(anonymous: "Valentina", content: "Una mañana, tras un sueño intranquilo, Gregorio Samsa se despertó convertido en un monstruoso insecto. Estaba echado de espaldas sobre un duro caparazón y, al alzar la cabeza, vio su vientre convexo y oscuro, surcado por curvadas callosidades, sobre el que casi no se aguantaba la colcha, que estaba a punto de escurrirse hasta el suelo. Numerosas patas, penosamente delgadas en comparación con el grosor normal de sus piernas, se agitaban sin concierto. - ¿Qué me ha ocurrido? No estaba soñando. Su habit")
		expect(comment).to be_invalid
	end
end