const Person = require("../models/person.models");
const Role = require("../models/role.models");


//GetById
exports.getById = async (req, res) => {
    const id = req.params.id
    await Person.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "Person not found! " + id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while retrieving Person. " + id,
      });
    });
}

//Get All
exports.getAll = async (req, res) => {
    try {
        const people = await Person.findAll();
        const peopleWithoutPassword = people.map(person => {
            const { password, ...personWithoutPassword } = person.dataValues;
            return personWithoutPassword;
        });
        res.send(peopleWithoutPassword);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Person.",
        });
    }
};

// Get Person By Department and Role
exports.getPersonByDepartmentAndRole = async (req, res) => {
  const { departmentId, roles } = req.body;
  
  try {
      // First, find the roles
      const foundRoles = await Role.findAll({
          where: {
              name: roles
          }
      });
      
      if (foundRoles.length === 0) {
          return res.status(404).send({
              message: "No roles found."
          });
      }

      const roleIds = foundRoles.map(role => role.id);
      
      // Then, find the people by department and roles
      const people = await Person.findAll({
          where: {
              departmentId: departmentId
          },
          include: [{
              model: Role,
              where: {
                  id: roleIds
              },
              through: {
                  attributes: []
              }
          }]
      });

      const peopleWithoutPassword = people.map(person => {
          const { password, ...personWithoutPassword } = person.dataValues;
          return personWithoutPassword;
      });
      
      res.status(200).send(peopleWithoutPassword);
  } catch (err) {
      res.status(500).send({
          message: "Error retrieving people by department and role.",
          error: err.message
      });
  }
};

//Get Person By Role
exports.getByRole = async (req, res) => {
    const { roles } = req.body;
    
    try {
        const foundRoles = await Role.findAll({
            where: {
                name: roles
            }
        });
        
        if (foundRoles.length === 0) {
            return res.status(404).send({
                message: "No roles found."
            });
        }

        const roleIds = foundRoles.map(role => role.id);
        
        const people = await Person.findAll({
            include: [{
                model: Role,
                where: {
                    id: roleIds
                },
                through: {
                    attributes: []
                }
            }]
        });
        const peopleWithoutPassword = people.map(person => {
            const { password, ...personWithoutPassword } = person.dataValues;
            return personWithoutPassword;
        });
        res.status(200).send(peopleWithoutPassword);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving people by role.",
            error: err.message
        });
    }
};

//update Profile
exports.updateProfile = async (req, res) => {
    const id = req.params.id;
    await Person.update(req.body,
     {
      where: { Id: id },
    })
    .then((num) => {
        if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile id = ${id}. Maybe Profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
        
      res.status(500).send({
        message: "Error updating Profile with id= "  + id,
      });
    })
}

//Delete
exports.delete = async (req, res) => {
    const id = req.params.id;
    await Person.destroy({
      where: { Id: id },
    })
    .then((num)=>{
        if (num == 1) {
            res.send({
          message: "Person was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`,
        });
        }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Person with id=" + id,
      });
    })
}