import { RESTDataSource } from "@apollo/datasource-rest";
import { Amenity, CreateListingInput, Listing } from "../types";

export class ListingAPI extends RESTDataSource{
    baseURL = "https://rt-airlock-services-listing.herokuapp.com/";
    getFeaturedListings(){
        return this.get<Listing[]>("featured-listings");
    }
    getListing(listingId: String){
        return this.get<Listing>(`listings/${listingId}`);
    }
    getAmenities(id: String){
        console.log("Calling API");
        return this.get<Amenity[]>(`listings/${id}/amenities`);
    }
    createListing(listing: CreateListingInput): Promise<Listing> {
        return this.post("listings", {
          body: {
            listing
          }
        });
      }
}