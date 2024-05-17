import {useNavigate} from "react-router-dom";
import styles from "./LandingPage.module.css"
import {useAuth} from "../../../../hooks/use-auth";
import {useDispatch} from "react-redux";
import {Button} from "antd";
import {removeAuth} from "../../../../store/slices/authSlice";
import {Container, List, ThemeIcon, Title,} from '@mantine/core';
import {CheckOutlined} from "@ant-design/icons";
import LandingPageImage from "../../../../assets/images/LandingPage.svg"
import Header from "../../components/Header/Header";


export function LandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useAuth()

    return (
        <div className={styles.landingPage}>
            <Header/>
            <Container>
                <div className={styles.landingPage__firstContainer}>
                    <div className={styles.landingPage__firstContainer__text}>
                        <h1 className={styles.landingPage__firstContainer__text__title}>
                            Система управления проектами
                            <span className={styles.landingPage__firstContainer__text__titleHighlight}>π-1</span>
                        </h1>
                        <p className={styles.landingPage__firstContainer__text__description}>
                            Эффективное управление проектом для твоей команды. Все инструменты - теперь в одном
                            приложении
                        </p>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <CheckOutlined/>
                                    {/*<IconCheck size={rem(12)} stroke={1.5} />*/}
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Постановка задач</b> – менеджмент задач всех членов команды с разным представлением:
                                таблица, канбан, гант
                            </List.Item>
                            <List.Item>
                                <b>Менеджер багов</b> – сообщайте о багах, отслеживайте их и расставляйте приоритеты
                            </List.Item>
                            <List.Item>
                                <b>Блочный редактор статей</b> – своя база знаний с обширным набором блочных модулей
                            </List.Item>
                            <List.Item>
                                <b>Построитель схем</b> – создавай схемы разной сложности и встраивай их в статьи
                            </List.Item>
                        </List>

                        {/*<Group mt={30}>*/}
                        {/*    <Button radius="xl" size="md" className={classes.control}>*/}
                        {/*        Get started*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="default" radius="xl" size="md" className={classes.control}>*/}
                        {/*        Source code*/}
                        {/*    </Button>*/}
                        {/*</Group>*/}
                    </div>
                    <img style={{flex: "1", width: "500px"}} className={styles.landingPage__firstContainer__image}
                         src={LandingPageImage} alt={""}/>
                </div>
            </Container>
        </div>
    )
}
