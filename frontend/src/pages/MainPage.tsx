import {Box, Button, Card, Typography} from "@mui/material";
import Navbar from "../components/Navbar";
import {grey} from "@mui/material/colors";

export default function MainPage(){
    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            <Box sx={{display: 'flex', height: '91vh'}}>
                <Card sx={{
                    position: 'absolute',
                    top: '15%',
                    left: '5%',
                    right: '52%',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    '&:hover': { background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)', color: 'white'}
                }}>
                    <Typography variant="h4" sx={{textAlign: 'center', mt: 2}}>Szukasz pracy?</Typography>
                    <Typography variant="subtitle1" sx={{mt: 3, ml: 2, mr: 2}}>
                        HireMe to idealne miejsce do zareklamowania swojej kandydatury.<br/><br/>
                        Tutaj odwracamy rolę - Ty przedstawiasz swoją osobę jako kandydata na wskazane przez siebie
                        stanowisko,
                        a firmy wybierają z puli kandydatów osoby i kontaktują się z nimi w celu przedstawienia oferty
                        pracy.<br/><br/>
                        Masz jedno zadanie - przedstawić siebie w taki sposób, aby przyciągnąć jak najwięcej
                        potencjalnych pracodawców.<br/><br/>
                        Dzięki nam nie musisz już się zastanawiać, czy po złożeniu aplikacji firma skontaktuje się z
                        Tobą - jeśli
                        Twoja osoba będzie spełniała kryteria pracodawców, oni pierwsi odezwą się do Ciebie.<br/><br/>
                        Jesteś zmęczony rozsyłaniem setek CV? Załóż bezpłatne konto i pozwól pracodawcom dotrzeć do Ciebie.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button href="/signup" sx={{
                            mt: 10,
                            mb: 10,
                            bgcolor: 'rgb(96,58,120)',
                            color: 'white',
                            borderRadius: '5px',
                            '&:hover': { bgcolor: "rgb(207, 159, 255)"}
                        }}>
                            Zarejestruj się
                        </Button>
                    </Box>
                </Card>
                <Card sx={{
                    position: 'absolute',
                    top: '15%',
                    left: '52%',
                    right: '5%',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    '&:hover': { background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)', color: 'white'}
                }}>
                    <Typography variant="h4" sx={{textAlign: 'center', mt: 2}}>Szukasz pracowników?</Typography>
                    <Typography variant="subtitle1" sx={{mt: 3, ml: 2, mr: 2}}>
                        HireMe daje Ci możliwość przeglądania pośród dziesiątek kandydatów czekających na
                        zatrudnienie.<br/><br/>
                        Dobierz kryteria według swoich preferencji i znajdź wymarzonego pracownika.<br/><br/>
                        Koniec z przeglądaniem niezliczonych CV - tutaj w szybki i łatwy sposób wyselekcjonujesz grupę
                        kandydatów spełniających Twoje wymagania.<br/><br/>
                        Kontaktuj się tylko z wybranymi przez Ciebie kandydatami, nasz chat pozwala Ci na łatwą i
                        przejrzystą komunikację z wybranymi osobami.
                        Ty piszesz pierwszy, konwersacje prowadzisz tylko z kandydatami wybranymi przez
                        Ciebie.<br/><br/>
                        Wynieś swoją rekrutację na wyższy poziom - z HireMe znajdowanie nowych pracowników staje się proste i przyjemne.
                        Załóż konto już teraz i znajdź swojego pracownika.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button href="/signupHR" sx={{
                            mt: 10,
                            mb: 10,
                            bgcolor: 'rgb(96,58,120)',
                            color: 'white',
                            borderRadius: '5px',
                            '&:hover': { bgcolor: "rgb(207, 159, 255)"}
                        }}>
                            Zarejestruj się
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}