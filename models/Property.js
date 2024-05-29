import { Schema , model ,models } from "mongoose";

const PropertySchema  = new Schema({
            owner : {
                 type: Schema.Types.ObjectId , 
                 ref:'User', 
                 required : true,
            }, 
            name : {
                 type : String , 
                 required: [true, 'Name is required'], 
            }, 
            type : {
                  type : String , 
                  required : [true, 'Propety type is required'], 
            }, 
            description  :{
                 type : String , 
            }, 
            location : {
                 street: {
                      type : String , 
                      required : [true , 'Street Name is required'], 
                 }, 
                 city : {
                      type : String , 
                      required : [true , 'City  Name is required'], 
                 },
                 zipcode  :{
                      type : String , 
                      required : [true , 'ZipCode Name is required'], 
                 }, 
                 state: {
                    type : String , 
                    required : [true , 'State Name is required'], 
                 }
            }, 
            beds : {
                 type : Number , 
                 required : [true, 'Beds are required']
            },
            baths : {
                type : Number , 
                required : [true , 'Baths are required'], 
            }, 
            square_feet : {
                 type : Number , 
                 required: [true, 'Square feet is required']
            }, 
            amenities : [
                {
                    type : String, 
                }
            ], 
            rates  :{
                nightly : {
                     type : Number , 
                }, 
                monthly :{
                     type : Number , 
                }, 
                weekly : {
                    type: Number , 
                }
            }, 
            seller_info : {
                  name : {
                     type : String , 
                  } , 
                  email : {
                     type : String ,
                  }, 
                  phone : {
                     type : String ,
                  }
            }, 
            images : [
                {
                    type : String , 
                }
            ], 
            is_featured : {
                    type : Boolean,  
                    default : false , 
            }


},{timestamps:true})

const Property = models.Property || model('Property' , PropertySchema);
export default Property ; 