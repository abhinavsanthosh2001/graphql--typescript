import { validateFullAmenities } from "./helpers";
import { Resolvers } from "./types";
export const resolvers: Resolvers = {
    Query: {
        featuredListings: (_, __,  { dataSources }) => {
          return dataSources.listingAPI.getFeaturedListings();
        },
        listing: (_, {id}, {dataSources}) => {
            return dataSources.listingAPI.getListing(id);
        }
    },
    Listing: {
        amenities: ({id, amenities}, __, {dataSources})=>{
            return validateFullAmenities(amenities)?amenities:dataSources.listingAPI.getAmenities(id);
        }
    },
    Mutation:{
    createListing: async (_, { input }, { dataSources }) => {
        const response = await dataSources.listingAPI.createListing(input);
        console.log(response);
        // everything succeeds with the mutation
        return {
          code: 200,
          success: true,
          message: "Listing successfully created!",
          listing: null, // We don't have this value yet
        }
      },
    }
    
}