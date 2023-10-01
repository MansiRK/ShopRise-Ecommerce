/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const slugify = require("slugify");
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
const db = require("../database");
// eslint-disable-next-line import/no-extraneous-dependencies

const createProduct = (req, res) => {
  const storage = multer.memoryStorage(); // Use memory storage as an example
  const upload = multer({ storage }).single("product_image");

  upload(req, res, (uploadError) => {
    if (uploadError) {
      return res.status(500).json({
        message: `Failed to upload image: ${uploadError.message}`,
      });
    }

    const {
      product_name,
      product_description,
      categoryId,
      product_price,
      product_quantity,
    } = req.body;

    const product_slug = slugify(product_name);
    const product_image = req.file; // Assuming you're using multer to handle file uploads

    if (!product_image) {
      return res
        .status(400)
        .json({ message: "Image is compulsory to create a product." });
    }

    // Read the image data and content type from the uploaded file
    const data = product_image.buffer;
    const contentType = product_image.mimetype;

    // Insert the product details into the 'products' table
    const createProductQuery = `
    INSERT INTO products (product_name, categoryId, product_description, product_price, product_quantity, product_slug)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

    db.query(
      createProductQuery,
      [
        product_name,
        categoryId,
        product_description,
        product_price,
        product_quantity,
        product_slug,
      ],

      (productError, productResult) => {
        if (productError) {
          return res.status(500).json({
            message: `Failed to create product: ${productError.message}`,
          });
        }

        const productId = productResult.insertId;

        // Insert the image data and content type into the 'image' table, referencing the product ID
        const insertImageQuery = `
        INSERT INTO image (data, contentType, productId)
        VALUES (?, ?, ?);
      `;

        db.query(
          insertImageQuery,
          [data, contentType, productId],
          (imageError) => {
            if (imageError) {
              return res.status(500).json({
                message: `Failed to insert image: ${imageError.message}`,
              });
            }

            const fetchProductQuery =
              "SELECT p.*, i.data AS imageData, i.contentType AS imageContentType FROM products AS p LEFT JOIN image AS i ON p.product_id = i.productId WHERE p.product_id = ?";

            db.query(
              fetchProductQuery,
              [productId],
              (fetchError, fetchResult) => {
                if (fetchError) {
                  return res.status(500).json({
                    message: `Failed to fetch product details: ${fetchError.message}`,
                  });
                }

                if (fetchResult.length === 0) {
                  return res.status(404).json({
                    message: "Product not found",
                  });
                }

                const productWithImage = fetchResult[0];

                return res.status(200).json({
                  message: "Product and image created successfully",
                  product: productWithImage,
                });
              }
            );
          }
        );
      }
    );
  });
};

const getProducts = (req, res) => {
  const fetchQuery =
    "SELECT p.*, i.*, c.* FROM products AS p INNER JOIN category AS c ON p.categoryId = c.category_id LEFT JOIN image AS i ON p.product_id = i.productId ORDER BY p.product_timestamps DESC LIMIT 15";

  db.query(fetchQuery, (error, results) => {
    if (error) {
      res.status(500).json({
        message: `Failed to fetch products. ${error.message}`,
      });
    } else {
      res.status(200).json({
        message: "Products fetched successfully",
        count: results.length,
        products: results, // Send the actual query results as JSON
      });
    }
  });
};

const getSingleProduct = (req, res) => {
  const slug = req.params.slug;
  const fetchQuery =
    //  "SELECT * FROM products WHERE slug = ?";
    " SELECT p.* , c.* FROM products AS p INNER JOIN category AS c ON p.categoryId = c.category_id WHERE product_slug=?";
  db.query(fetchQuery, [slug], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to fetch the product. ${error.message}`,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "No product found with this name",
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product: result[0],
    });
  });
};

const getProductsByCategory = (req, res) => {
  const categorySlug = req.params.slug;
  const fetchCategoryQuery = "SELECT * FROM category WHERE category_slug = ?";

  db.query(
    fetchCategoryQuery,
    [categorySlug],
    async (error, categoryResult) => {
      if (error) {
        return res.status(500).json({
          message: `Failed to fetch category. ${error.message}`,
        });
      }

      if (categoryResult.length === 0) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      const categoryId = categoryResult[0].category_id;
      const fetchProductQuery = "SELECT * FROM products WHERE categoryId = ?";

      db.query(
        fetchProductQuery,
        [categoryId],
        async (error, productResults) => {
          const categoryDetails = categoryResult[0];
          const productDetails = productResults;

          if (error) {
            return res.status(500).json({
              message: `Failed to fetch products. ${error.message}`,
            });
          }

          if (productResults.length === 0) {
            return res.status(404).json({
              message: "Product not found",
              category: categoryDetails,
            });
          }

          return res.status(200).json({
            message: "Products found",
            count: productResults.length,
            products: productDetails,
            category: categoryDetails,
          });
        }
      );
    }
  );
};

const getProductImage = (req, res) => {
  const product_id = req.params.id;

  const fetchQuery =
    "SELECT i.* from image i JOIN products p ON i.productId = p.product_id WHERE p.product_id = ?";

  db.query(fetchQuery, [product_id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Error in fetching the product images. ${error.message}`,
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        message: "No image found of this product",
      });
    }

    const type = result[0].contentType;
    const imageData = result[0].data;

    res.setHeader("Content-Type", type);
    return res.status(200).send(imageData);
  });
};

const searchProduct = (req, res) => {
  const keyword = req.params.query;
  // (" SELECT p.*, i.* , c.* FROM products AS p INNER JOIN category AS c ON p.categoryId = c.category_id LEFT JOIN image AS i ON p.product_id = i.productId WHERE product_slug=?");

  const searchQuery =
    "SELECT p.*, i.image_id AS image_id, i.data AS image_data, i.contentType AS image_type FROM products AS p LEFT JOIN image AS i ON i.productId = p.product_id WHERE product_name LIKE ?";

  db.query(searchQuery, [`%${keyword}%`], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to search products. ${error.message}`,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        message: "No product found with this name",
      });
    }
    return res.status(200).json({
      message: "Products searched successfully",
      count: results.length,
      products: results,
    });
  });
};

// const updateProduct = (req, res) => {
//   const productId = req.params.id;

//   const updatedFields = req.body;
//   // // Ensure that at least one field is being updated
//   // if (Object.keys(updatedFields).length === 0) {
//   //   return res.status(400).json({
//   //     message: "No fields provided for update.",
//   //   });
//   // }

//   if (updatedFields.product_name) {
//     updatedFields.product_slug = slugify(updatedFields.product_name);
//   }

//   const updateQuery = "UPDATE products SET ? WHERE product_id = ?";
//   const queryParams = [updatedFields, productId];

//   db.query(updateQuery, queryParams, (error, result) => {
//     if (error) {
//       return res.status(500).json({
//         message: `Failed to update product. ${error.message}`,
//       });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "No product found with this ID",
//       });
//     }

//     const fetchQuery = "SELECT * FROM products WHERE product_id = ?";

//     db.query(fetchQuery, [productId], (fetchError, fetchResult) => {
//       if (fetchError) {
//         return res.status(500).json({
//           message: `Failed to fetch updated product. ${fetchError.message}`,
//         });
//       }

//       return res.status(200).json({
//         message: "Product updated successfully",
//         product: fetchResult[0],
//       });
//     });
//   });
// };

// const updateProduct = (req, res) => {
//   const productId = req.params.id;
//   const updatedFields = req.body;

//   // Ensure that at least one field is being updated
//   if (Object.keys(updatedFields).length === 0) {
//     return res.status(400).json({
//       message: "No fields provided for update.",
//     });
//   }

//   if (updatedFields.product_name) {
//     updatedFields.product_slug = slugify(updatedFields.product_name);
//   }

//   // Construct the SET clause dynamically
//   const setClauses = [];
//   const queryParams = [];

//   for (const key in updatedFields) {
//     if (updatedFields.hasOwnProperty(key)) {
//       setClauses.push(`${key} = ?`);
//       queryParams.push(updatedFields[key]);
//     }
//   }

//   // Add the productId as the last parameter
//   queryParams.push(productId);

//   const updateQuery = `UPDATE products SET ${setClauses.join(
//     ", "
//   )} WHERE product_id = ?`;

//   db.query(updateQuery, queryParams, (error, result) => {
//     if (error) {
//       return res.status(500).json({
//         message: `Failed to update product. ${error.message}`,
//       });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "No product found with this ID",
//       });
//     }

//     const fetchQuery = "SELECT * FROM products WHERE product_id = ?";

//     db.query(fetchQuery, [productId], (fetchError, fetchResult) => {
//       if (fetchError) {
//         return res.status(500).json({
//           message: `Failed to fetch updated product. ${fetchError.message}`,
//         });
//       }

//       return res.status(200).json({
//         message: "Product updated successfully",
//         product: fetchResult[0],
//       });
//     });
//   });
// };

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedFields = req.body;

  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single("product_image");

  upload(req, res, (uploadError) => {
    if (uploadError) {
      return res.status(500).json({
        message: `Failed to upload image: ${uploadError.message}`,
      });
    }

    // Ensure that at least one field is being updated
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        message: "No fields provided for update.",
      });
    }

    // Prepare the SET clause for the SQL UPDATE query
    let setClause = "";
    const queryParams = [];

    for (const key in updatedFields) {
      if (key !== "product_id") {
        setClause += `${key} = ?, `;
        queryParams.push(updatedFields[key]);
      }
    }

    // Remove the trailing comma and space from the setClause
    setClause = setClause.slice(0, -2);

    // Construct the SQL UPDATE query
    const updateQuery = `UPDATE products SET ${setClause} WHERE product_id = ?`;
    queryParams.push(productId);

    // Execute the SQL UPDATE query
    db.query(updateQuery, queryParams, (error, result) => {
      if (error) {
        return res.status(500).json({
          message: `Failed to update product. ${error.message}`,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No product found with this ID",
        });
      }

      // Fetch the updated product after the update
      const fetchQuery = "SELECT * FROM products WHERE product_id = ?";

      db.query(fetchQuery, [productId], (fetchError, fetchResult) => {
        if (fetchError) {
          return res.status(500).json({
            message: `Failed to fetch updated product. ${fetchError.message}`,
          });
        }

        const updatedProduct = fetchResult[0];

        const imageQuery = "SELECT image_id FROM image WHERE productId = ?";

        db.query(imageQuery, [productId], (imageError, imageResult) => {
          if (imageError) {
            return res.status(500).json({
              message: `Failed to fetch associated images. ${imageError.message}`,
            });
          }

          // Add the fetched image details to the updated product
          updatedProduct.product_image = imageResult;

          return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
          });
        });
      });
    });
  });
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;

  const deleteQuery = "DELETE FROM products WHERE product_id = ?";

  db.query(deleteQuery, [productId], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to delete the product. ${error.message}`,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No product found with this ID",
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  });
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  getProductsByCategory,
  getProductImage,
  searchProduct,
  updateProduct,
  deleteProduct,
};
