/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const slugify = require("slugify");
const db = require("../database");

const createCategory = (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({
      message: "Plese provide category name",
    });
  }

  const category_slug = slugify(category_name);

  const insertQuery =
    "INSERT INTO category (category_name, category_slug) VALUES (?, ?)";

  db.query(insertQuery, [category_name, category_slug], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Error in creating category: ${error.message}`,
      });
    }

    // const createdCategory = {
    //   // category_id: result[0].category_id,

    // };

    if (result.affectedRows === 1 && result.insertId) {
      const category = {
        category_id: result.insertId,
        category_name,
        category_slug,
        // Add other properties here if needed
      };

      return res.status(200).json({
        message: "Category created successfully",
        category,
      });
    }
  });
};

const getCategories = (req, res) => {
  const fetchQuery = "SELECT * FROM category ORDER BY category_timestamp DESC";

  db.query(fetchQuery, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Error in fetching categories: ${error.message}`,
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: "There are no categories",
      });
    }

    return res.status(200).json({
      message: "Categories fetched successfully",
      count: results.length,
      category: results,
    });
  });
};

const getSingleCategory = (req, res) => {
  const { slug } = req.params;

  const fetchQuery = "SELECT * FROM category WHERE category_slug = ?";

  db.query(fetchQuery, [slug], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Error in fetching categories: ${error.message}`,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "No category found",
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "This category already exists",
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      category: result[0],
    });
  });
};

const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const updatedFields = req.body;

  if (!updatedFields.category_name) {
    return res.status(400).json({
      message: "Please provide category name",
    });
  }

  const category_slug = slugify(updatedFields.category_name);

  const updatedCategory = {
    category_name: updatedFields.category_name,
    category_slug,
  };

  const updateQuery = "UPDATE category SET ? WHERE category_id = ?";

  // eslint-disable-next-line function-paren-newline
  db.query(
    updateQuery,
    [updatedFields, categoryId, category_slug],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: `Error in updating category: ${error.message}`,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No category ID found",
        });
      }

      const fetchQuery = "SELECT * FROM category WHERE category_id = ?";
      db.query(fetchQuery, [categoryId], (fetchError, fetchResult) => {
        if (fetchError) {
          return res.status(500).json({
            message: `Error in fetching the updated category. ${fetchError}`,
          });
        }

        if (fetchResult.length === 0) {
          return res.status(404).json({
            message: "No category found after update",
          });
        }

        return res.status(200).json({
          message: "Category updated successfully",
          category: updatedCategory,
        });
      });
    }
  );
};

const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  const deleteQuery = "DELETE FROM category WHERE category_id = ?";

  db.query(deleteQuery, [categoryId], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Error in deleting category: ${error.message}`,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No category found with this ID",
      });
    }
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  });
};

module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
