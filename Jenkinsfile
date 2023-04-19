// CODE_CHANGES = getGitChanges()  Some logic in a function that will return true or false 
pipeline{
    agent any
    //we can define our own environment variables using the environment attribute
    // environment{
    //     NEW_VERSION = "1.3.0"
    //     Defining Credentials like this the credentials will be available for all build stages.
    //     SERVER_CREDENTIALS = credentials('id of the jenkins credentials') Use to get the credentials from the jenkins sever we need credentials binding plugin for this.
    // }
    // Tools provide the tools commands available in groovy script you can make them available using tools attribute 
    // tools{
    //     maven Maven-3.9 // name of the maven in jenkins server plugin
    // }
    // Another important thing is parameters
    parameters{
        // string (name:'VERSION', defaultValue: '', description:'version to deploy on prod')
        choice (name:'VERSION', choices: ['1.0','1.2','1.3'], description:'')
        booleanParam (name:'executeTests', defaultValue: true, description:'')
    }
        stages{
        stage("build"){
            when{
                expression{
                    //When should this stage or below steps should execute can be defined fro each build stage 
                    //For Example using Environment Variable 
                    // BRANCH_NAME == 'dev' || 'master'
                    // You can define your own like this
                    // BRANCH_NAME == 'dev' || CODE_CHANGES == true
                    echo "expression build"
                }
            }
            steps{
                echo 'building the application...'
                // echo " build version ${NEW_VERSION}" works only in double quotes 
            }
        }
        stage("test"){
            when{
                expression{
                    //When should this stage or below steps should execute can be defined fro each build stage 
                    // we can use parameters here
                    // params.executeTests
                    echo "expression test"
                }
            }
            steps{
                echo 'testing the application...'
            }
        }
        stage("deploy"){
        //  Another way to define or get credential from jenkins server is using wrapper syntax like this 
        // withCredentials([
        //     usernamePassword(credentials:'id of the jenkins credentials', usernameVariable: USER, passwordVariable: PASS)
        // ]){
        //     sh "some script ${USER} ${PASS}"
        // }

            when{
                expression{
                    //When should this stage or below steps should execute can be defined fro each build stage 
                    echo "expression deploy"
                }
            }
            steps{
                echo 'deploying the application...'
                echo "deploying version ${params.VERSION}"
            }
        }
    }
    post{
        always{
            //Ececute always if build is success or failure useful to notify team about build status
            echo "always"
        }
        success{
            //Ececute when build is success useful to notify team about build status
            echo "success"
        }
        failure{
            //Ececute when build is failure useful to notify team about build status
            echo "failure"
        }
    }
}

