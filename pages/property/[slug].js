import { sanityClient } from "../../sanity";
import Link from 'next/link';

import { isMultiple } from "../../utils";
import Image from '../../components/Image';
import Review from "../../components/Review";
import Map from "../../components/Map";

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {

    const reviweAmount = reviews.length;
    console.log(mainImage);
  return (
    <div className="container">
      <h1><b>{title}</b></h1>
      <p>{reviweAmount} review{isMultiple(reviweAmount)}</p>
      <div className="images-section">
          <Image identifier="main-image" image={ mainImage } />
        <div className="sub-images-section">
            {images.map(({_key, asset}, image) =>  <Image key={_key} identifier="image" image={ asset } />)}
        </div>
      </div>

        <div className="section">
            <div className="information">
                <h2><b>{propertyType} hosted by {host?.name}</b></h2>
                    <h4>{bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)} </h4>

                    <hr />
                    <h4><b>Enhanced Clean</b></h4>
                    <p>This host is committed to Airbnb's 5-Step enhanced cleaning process</p>
                    <h4><b>Amenities For Everyday Living</b></h4>
                    <p>This host has equipped this place for long days stays - Kitchen, shampoo, conditioner, hairdaryer included</p>
                    <h4><b>Hosue Rules</b></h4>
                    <p>This isn't suitable for pets and and the host doesn't allow parties or smoking.</p>

            </div>
                    <div className="price-box">
                        <h2>${pricePerNight}</h2>
                        <h4>{reviweAmount} review{isMultiple(reviweAmount)}</h4>
                        <Link href="/"><div style={{cursor:"pointer"}} className="button">Change Dates</div></Link>
                    </div>
        </div>

      <hr />
    
    <h4>{description}</h4>

<hr />

<h2>{reviweAmount} review{isMultiple(reviweAmount)}</h2>

{reviweAmount > 0 && reviews.map((review) => <Review key={review._key} review={review} /> )}

    <hr />

    <h2>Location</h2>
    <Map location={location}></Map>

    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[ _type == "property" && slug.current == $pageSlug][0] {
        title,
        location,
        propertyType,
        mainImage,
        images,
        pricePerNight,
        beds,
        bedrooms,
        description,
        host->{
            _id,
            name,
            slug,
            image
        },
        reviews[]{
            ...,
            traveller->{
                _id,
                name,
                slug,
                image
            }
        }
    }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
    };
  }
};

export default Property;
